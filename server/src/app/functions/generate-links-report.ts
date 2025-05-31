import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { exportToCSVAndlinks } from '@/infra/storage/export-csv-upload'
import { stringify } from 'csv-stringify'
import { asc, or, ilike } from 'drizzle-orm'
import { z } from 'zod'

export const exportLinkInput = z.object({
  searchQuery: z.string().optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(100),
})

type ExportLinksOutput = {
  reportUrl: string
}

type ExportLinksInput = z.infer<typeof exportLinkInput>

export async function generateLinksReport(
  input: ExportLinksInput
): Promise<Either<never, ExportLinksOutput>> {
  const { searchQuery, page, pageSize } = exportLinkInput.parse(input)

  const searchCondition = searchQuery
    ? or(
        ilike(schema.links.originalUrl, `%${searchQuery}%`),
        ilike(schema.links.shortUrl, `%${searchQuery}%`)
      )
    : undefined

  const offset = (page - 1) * pageSize

  const { sql, params } = db
    .select({
      id: schema.links.id,
      original_url: schema.links.originalUrl,
      short_url: schema.links.shortUrl,
      access_count: schema.links.accessCount,
      created_at: schema.links.createdAt,
    })
    .from(schema.links)
    .where(searchCondition)
    .orderBy(asc(schema.links.createdAt))
    .offset(offset)
    .limit(pageSize)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(pageSize)

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
    fileName: `${new Date().toISOString()}-links.csv`,
    contentStream: linksToStorageStream,
  })

  const [{ url }] = await Promise.all([linksToStorage, convertToCSVPipeline])

  return makeRight({ reportUrl: url })
}
