import { createLink, createLinkInput } from '@/app/functions/create-link'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinks: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link',
    {
      schema: {
        summary: 'Create Link',
        tags: ['links'],
        body: createLinkInput,
        response: {
          201: z
            .object({ idLink: z.string() })
            .describe('Link created successfully'),
          400: z.object({ message: z.string() }).describe('Invalid URL format'),
        },
      },
    },
    async (request, reply) => {
        try {
          const { originalUrl, shortUrl } = createLinkInput.parse(request.body)
  
          const link = await createLink({ originalUrl, shortUrl })
  
          return reply.status(201).send({ idLink: link.id })
        } catch (err) {
          if (err instanceof Error && err.message === 'Short URL already exists') {
            return reply.status(400).send({ message: err.message })
          }
  
          console.error(err) // Útil pra debug local
          return reply.status(500).send({ message: 'Internal server error' })
        }
    }
  )
}
