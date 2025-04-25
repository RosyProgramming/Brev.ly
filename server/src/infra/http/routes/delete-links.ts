import { deleteLink, deleteLinkInput } from '@/app/functions/delete-link'
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
          204: z.object({ success: z.literal(true) }).describe('Link deleted successfully'),
          404: z.object({ message: z.string() }).describe("Link not found"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteLink({ id })

      if (isLeft(result)) {
        return reply.status(404).send({ message: result.left.message })
      }

      return reply.status(204).send({ success: true})
    }
  )
}
