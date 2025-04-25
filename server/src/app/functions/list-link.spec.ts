import { isRight, unwrapEither } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import dayjs from 'dayjs'
import { uuidv7 } from 'uuidv7'
import { describe, expect, it } from 'vitest'
import { listLink } from './list-link'

describe('get list links', () => {
  it('should be able to get the list of links', async () => {
    const originalUrlPattern = `https://www.localhost.com/${uuidv7()}`

    const link1 = await makeLink({ originalUrl: originalUrlPattern })
    const link2 = await makeLink({ originalUrl: originalUrlPattern })
    const link3 = await makeLink({ originalUrl: originalUrlPattern })
    const link4 = await makeLink({ originalUrl: originalUrlPattern })
    const link5 = await makeLink({ originalUrl: originalUrlPattern })

    const sut = await listLink({
      searchQuery: originalUrlPattern,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: link5.id }),
      expect.objectContaining({ id: link4.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link1.id }),
    ])
  })

  it('should be able to get paginated the list of links', async () => {
    const originalUrlPattern = `https://www.localhost.com/${uuidv7()}`

    await makeLink({ originalUrl: originalUrlPattern })
    await makeLink({ originalUrl: originalUrlPattern })
    await makeLink({ originalUrl: originalUrlPattern })
    await makeLink({ originalUrl: originalUrlPattern })
    await makeLink({ originalUrl: originalUrlPattern })

    const sut = await listLink({
      searchQuery: originalUrlPattern,
      page: 1,
      pageSize: 3,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).links).toHaveLength(3)
  })

  it('should be able to get sorted the list of links', async () => {
    const originalUrlPattern = `https://www.localhost.com/${uuidv7()}`

    const link1 = await makeLink({
      originalUrl: `${originalUrlPattern}`,
      createdAt: new Date(),
    })

    const link2 = await makeLink({
      originalUrl: `${originalUrlPattern}`,
      createdAt: dayjs().subtract(1, 'day').toDate(),
    })

    const link3 = await makeLink({
      originalUrl: `${originalUrlPattern}`,
      createdAt: dayjs().subtract(2, 'day').toDate(),
    })

    const link4 = await makeLink({
      originalUrl: `${originalUrlPattern}`,
      createdAt: dayjs().subtract(3, 'day').toDate(),
    })

    const link5 = await makeLink({
      originalUrl: `${originalUrlPattern}`,
      createdAt: dayjs().subtract(4, 'day').toDate(),
    })

    let sut = await listLink({
      searchQuery: originalUrlPattern,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: link1.id }),
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link4.id }),
      expect.objectContaining({ id: link5.id }),
    ])

    sut = await listLink({
      searchQuery: originalUrlPattern,
      sortBy: 'createdAt',
      sortDirection: 'asc',
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: link5.id }),
      expect.objectContaining({ id: link4.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link1.id }),
    ])
  })

  it('should return links that match the search query in the shortUrl', async () => {
    const shortUrl = `abc-${uuidv7()}`
    await makeLink({ shortUrl })

    const result = await listLink({ searchQuery: 'abc-' })

    expect(isRight(result)).toBe(true)
    expect(unwrapEither(result).total).toBeGreaterThan(0)
    expect(unwrapEither(result).links[0].shortUrl).toContain('abc-')
  })

  it('should return empty when searchQuery matches nothing', async () => {
    const result = await listLink({ searchQuery: 'no-match-here' })

    expect(isRight(result)).toBe(true)
    expect(unwrapEither(result).total).toBe(0)
    expect(unwrapEither(result).links).toHaveLength(0)
  })

  it('should work with default parameters', async () => {
    await makeLink()
    const result = await listLink({})

    expect(isRight(result)).toBe(true)
    expect(unwrapEither(result).links.length).toBeGreaterThan(0)
  })

  it('should paginate correctly to the second page', async () => {
    const pattern = `pag-${uuidv7()}`

    for (let i = 0; i < 10; i++) {
      await makeLink({ originalUrl: `${pattern}/${i}` })
    }

    const result = await listLink({
      searchQuery: pattern,
      page: 2,
      pageSize: 5,
    })

    expect(isRight(result)).toBe(true)
    expect(unwrapEither(result).links.length).toBe(5)
  })
})
