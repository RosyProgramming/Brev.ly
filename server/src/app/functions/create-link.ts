import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { uuidv7 } from 'uuidv7'
import { z } from 'zod'

// Schema de validação com zod
export const createLinkInput = z.object({
  originalUrl: z.string().url({ message: 'Invalid URL' }),
  shortUrl: z
    .string()
    .min(5, { message: 'Short URL must be at least 5 characters long' })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: 'Invalid short URL format' }),
})

// Tipo gerado automaticamente a partir do schema
type CreateLinkInput = z.infer<typeof createLinkInput>

// Função de criação do link
export async function createLink(data: CreateLinkInput) {
  const validatedData = createLinkInput.parse(data)

  // Verificar se já existe o shortUrl
  const existing = await db.query.links.findFirst({
    where: eq(schema.links.shortUrl, validatedData.shortUrl),
  })

  if (existing) {
    throw new Error('Short URL already exists')
  }

  const id = uuidv7()

  await db.insert(schema.links).values({
    id,
    originalUrl: validatedData.originalUrl,
    shortUrl: validatedData.shortUrl,
    accessCount: 0,
    createdAt: new Date(),
  })

  return { id }
}
