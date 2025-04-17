import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either' 
import { eq } from 'drizzle-orm'
import { uuidv7 } from 'uuidv7'
import { z } from 'zod'
import { ShortURlAlreadyExists } from './errors/shortUrl-already-exists'

// Schema de validação com zod
export const createLinkInput = z.object({
  originalUrl: z.string().url({ message: 'Invalid URL' }),
  shortUrl: z
    .string()
    .min(5, { message: 'Short URL must be at least 5 characters long' })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: 'Invalid short URL format' }),
})

// Tipo gerado automaticamente a partir do schema
type CreateLinkInput = z.input<typeof createLinkInput>

type CreatedLink = {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
}

// Função de criação do link
export async function createLink(input: CreateLinkInput): 
    Promise<Either<ShortURlAlreadyExists, CreatedLink>
> {

  // Verificar se já existe o shortUrl
  const existing = await db.query.links.findFirst({
    where: eq(schema.links.shortUrl, input.shortUrl),
  })

  if (existing) {
    return makeLeft(new ShortURlAlreadyExists())
  }

  const id = uuidv7()

  const linkResponse = await db.insert(schema.links).values({
        id,
        originalUrl: input.originalUrl,
        shortUrl: input.shortUrl,
  }).returning()
  
  return makeRight({
    id: linkResponse[0].id,
    originalUrl: linkResponse[0].originalUrl,
    shortUrl: linkResponse[0].shortUrl,
    accessCount: linkResponse[0].accessCount,
    createdAt: linkResponse[0].createdAt,
  })
}
