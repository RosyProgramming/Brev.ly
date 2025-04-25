import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { NotFoundError } from './errors/not-found-error'

export const deleteLinkInput = z.object({
  id: z.string().uuid(),
})

type DeleteLinkOutput = {
  idLink: string
}

type DeleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<NotFoundError, DeleteLinkOutput>> {
  const { id } = deleteLinkInput.parse(input)

  const linkExists = await db.query.links.findFirst({
    where: eq(schema.links.id, input.id),
  })

  if (!linkExists) {
    return makeLeft(new NotFoundError())
  }

  const [deleted] = await db
    .delete(schema.links)
    .where(eq(schema.links.id, id))
    .returning()

  return makeRight({ idLink: deleted.id })
}
