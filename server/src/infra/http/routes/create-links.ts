import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { schema } from '@/infra/db/schemas'
import { db } from '@/infra/db'
import { uuidv7 } from 'uuidv7'
import { z } from 'zod'
import { createLinkInput, createLink } from '@/app/functions/create-link'

export const createLinks: FastifyPluginAsyncZod = async server => {
    server.post(
        '/link',
        {
            schema: {
                summary: 'Create Link',
                tags: ['links'],
                body: createLinkInput,
                response: {
                    201: z.object({ id: z.string() }).describe('Link created successfully'),
                    400: z.object({ message: z.string() }).describe('Invalid URL format'),
                },
            },
        },
        async (request, reply) => {
            const { originalUrl, shortUrl } = request.body
      
            const link = await createLink({
              originalUrl,
              shortUrl,
            })
      
            return reply.status(201).send({ id: link.id })
          }
    );
}
