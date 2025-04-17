import { createLink, createLinkInput } from '@/app/functions/create-link'
import { isRight, unwrapEither } from '@/infra/shared/either'
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
          201: z.object({
                link: z.object({
                    id: z.string(),
                    originalUrl: z.string(),
                    shortUrl: z.string(),
                    accessCount: z.number(),
                    createdAt: z.date(),
                }),
            }).describe('Link created successfully'),
          400: z.object({ message: z.string() }).describe('Invalid URL format'),
        },
      },
    },
    async (request, reply) => {

        const { originalUrl, shortUrl } = createLinkInput.parse(request.body)

        const result = await createLink({ originalUrl, shortUrl })

        if (isRight(result)) {
            const link = unwrapEither(result)
            return reply.status(201).send({ link })
        }

        const error = unwrapEither(result)
    
        switch (error.constructor.name) {
            case 'ShortURlAlreadyExists':
                return reply.status(400).send({ message: error.message })
        }

    }
  )
}
