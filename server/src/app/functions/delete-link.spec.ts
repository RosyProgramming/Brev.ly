import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight, makeLeft } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { deleteLink } from './delete-link'
import { NotFoundError } from './errors/not-found-error'

describe('delete list links', () => {
  it('should delete the link if it exists', async () => {
    const created = await makeLink()

    const sut = await deleteLink({
      id: created.id,
    })

    expect(isRight(sut)).toBe(true)

    const verifyDelete = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, created.id))

    expect(verifyDelete).toHaveLength(0)
  })

  it('should return NotFoundError if the link does not exist', async () => {
    const link = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      originalUrl: 'http://example.com',
      shortUrl: 'http://short.ly/abc123',
      accessCount: 5,
      createdAt: new Date(),
    }

    const result = await deleteLink({ id: link.id })

    expect(result).toEqual(makeLeft(new NotFoundError()))
  })
})
