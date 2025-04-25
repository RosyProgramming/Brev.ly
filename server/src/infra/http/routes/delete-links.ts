import { deleteLink, deleteLinkInput } from '@/app/functions/delete-link'
import { NotFoundError } from '@/app/functions/errors/not-found-error'
import { isLeft } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinks: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/link/:id',
    {
      schema: {
        summary: 'Delete Link',
        tags: ['links'],
        params: deleteLinkInput,
        response: {
          200: z.object({ success: z.literal(true) }).describe('Link deleted com sucesso'),
          404: NotFoundError,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteLink({ id })
      
      if (isLeft(result)) {
        return reply.status(404).send(result.left)
      }

      return reply.status(200).send({ success: true})
    }
  )
}
