import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight, makeLeft } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { UrlNotExist } from './errors/url-not-exist'
import { originalUrl } from './get-original-url'

describe('get URL encurtada', () => {
  it('should be able to redirect a valid link', async () => {
    const createdLink = await makeLink()

    const sut = await originalUrl({
      shortUrl: createdLink.shortUrl,
    })

    expect(isRight(sut)).toBe(true)
    expect(sut.right?.originalUrl).toEqual(createdLink.originalUrl)

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, createdLink.shortUrl))

    expect(result[0].accessCount).toEqual(createdLink.accessCount + 1)
  })

  it('should return an error when trying to redirect a link that does not exist', async () => {
    const sut = await originalUrl({
      shortUrl: 'invalid-shortUrl',
    })

    expect(isRight(sut)).toBe(false)
    expect(sut.left?.message).toEqual('This shortened url does not exist.')
  })

  it('should throw a ZodError for an invalid shortUrl format', async () => {
    const result = await originalUrl({ shortUrl: 'invalid!-@shortUrl' })

    expect(result).toEqual(
      makeLeft(new UrlNotExist('This shortened url does not exist.'))
    )
  })
})
