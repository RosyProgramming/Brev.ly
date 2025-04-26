import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { UrlNotExist } from './errors/url-not-exist'

export const getOriginalUrl = z.object({
  shortUrl: z.string().min(1), 
})

type OriginalUrlOutput = {
  originalUrl: string
}

type GetOriginalUrlInput = z.input<typeof getOriginalUrl>

export async function originalUrl(
  input: GetOriginalUrlInput
): Promise<Either<UrlNotExist, OriginalUrlOutput>> {
  const { shortUrl } = getOriginalUrl.parse(input)


  const [url] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))

  if (!url) {
    return makeLeft(new UrlNotExist('This shortened url does not exist.'))
  }

  await db
    .update(schema.links)
    .set({ accessCount: sql`${schema.links.accessCount} + 1` })
    .where(eq(schema.links.id, url.id)) 

    
  return makeRight({ originalUrl: url.originalUrl })
}
