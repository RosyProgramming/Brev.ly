import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinks: FastifyPluginAsyncZod = async server => {
    server.post(
        '/links',
        {
          schema: {
            summary: 'Create Link',
            body: z.object({
                originalUrl: z.string().url(),
                shortUrl: z.string().min(5), 
            }),
            response: {
              
              201: z
                .object({
                    id: z.string(),
                    originalUrl: z.string(),
                    shortUrl: z.string(),
                    accessCount: z.number(),
                    createdAt: z.date(),
                }).describe('Link created successfully'),
              400: z
                .object({ message: z.string() })
                .describe('Invalid url'),
              409: z
                .object({ message: z.string() })
                .describe('Link already exists.'),
            },
          },
        },
        async (request, reply) => {
          return reply.status(201).send({id: '123',
            originalUrl: 'https://google.com',
            shortUrl: 'abc123',
            accessCount: 0,
            createdAt: new Date()})
        }
    )
}


