import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { asc, count, desc, ilike, or } from 'drizzle-orm'
import { z } from 'zod'

export const listLinkInput = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(['createdAt']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(100),
})

type ListLinkInput = z.input<typeof listLinkInput>

type LinksOutput = {
  links: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
  }[]
  total: number
}

export async function listLink(
  input: ListLinkInput
): Promise<Either<never, LinksOutput>> {
  const { page, pageSize, searchQuery, sortBy, sortDirection } =
    listLinkInput.parse(input)

  const searchCondition = searchQuery
    ? or(
        ilike(schema.links.originalUrl, `%${searchQuery}%`),
        ilike(schema.links.shortUrl, `%${searchQuery}%`)
      )
    : undefined

  const [links, [{ total }]] = await Promise.all([
    db
      .select({
        id: schema.links.id,
        originalUrl: schema.links.originalUrl,
        shortUrl: schema.links.shortUrl,
        accessCount: schema.links.accessCount,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .where(searchCondition)
      .orderBy(fields => {
        if (sortBy && sortDirection === 'asc') {
          return asc(fields[sortBy])
        }

        if (sortBy && sortDirection === 'desc') {
          return desc(fields[sortBy])
        }

        return desc(fields.id)
      })
      .offset((page - 1) * pageSize)
      .limit(pageSize),

    db
      .select({ total: count(schema.links.id) })
      .from(schema.links)
      .where(searchCondition),
  ])

  return makeRight({ links, total })
}
