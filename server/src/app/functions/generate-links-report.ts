import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { exportToCSVAndlinks } from '@/infra/storage/export-csv-upload'
import { stringify } from 'csv-stringify'
import { asc, or } from 'drizzle-orm'
import { ilike } from 'drizzle-orm'
import { z } from 'zod'

export const exportLinkInput = z.object({
  searchQuery: z.string().optional(),
})

type ExportLinksOutput = {
  reportUrl: string
}

type ExportLinksInput = z.infer<typeof exportLinkInput>

export async function generateLinksReport(
  input: ExportLinksInput
): Promise<Either<never, ExportLinksOutput>> {
  const { searchQuery } = exportLinkInput.parse(input)

  const searchCondition = searchQuery
    ? or(
        ilike(schema.links.originalUrl, `%${searchQuery}%`),
        ilike(schema.links.shortUrl, `%${searchQuery}%`)
      )
    : undefined

  const { sql, params } = db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(searchCondition)
    .orderBy(asc(schema.links.createdAt))
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'OriginalUrl' },
      { key: 'short_url', header: 'ShortUrl' },
      { key: 'access_count', header: 'AccessCount' },
      { key: 'created_at', header: 'Created At' },
    ],
  })

  const linksToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    linksToStorageStream
  )

  const linksToStorage = exportToCSVAndlinks({
    contentType: 'text/csv',
    folder: 'downloads',
    fileName: `${new Date().toISOString()}-linkss.csv`,
    contentStream: linksToStorageStream,
  })

  const [{ url }] = await Promise.all([linksToStorage, convertToCSVPipeline])


  return makeRight({ reportUrl: url })

}
