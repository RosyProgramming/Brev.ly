import { UrlNotExist } from '@/app/functions/errors/url-not-exist'
import { originalUrl } from '@/app/functions/get-original-url'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

async function urlIsReachable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' });
    return res.ok;
  } catch {
    return false;
  }
}

export const originalUrls: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link/:shortUrl',
    {
      schema: {
        summary: 'Redirect to original URL',
        tags: ['links'],
        params: z.object({
          shortUrl: z.string().min(1),
        }),
        response: {
          200: z
            .object({ originalUrl: z.string().url().describe('URL to redirect to') })
            .describe('Redirect information'),
          400: z
            .object({
              message: z.string(),
              issues: z.array(
                z.object({
                  field: z.string(),
                  message: z.string(),
                })
              ),
            })
            .describe('Invalid request params'),
          404: z.object({ message: z.string() }).describe('Link not found'),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      const result = await originalUrl({ shortUrl })

      if (isRight(result)) {
        const { originalUrl } = unwrapEither(result)

        // Verifica se o originalUrl é alcançável
        const reachable = await urlIsReachable(originalUrl)
        if (!reachable) {
          return reply.status(404).send({ message: 'URL original não está acessível' })
        }

        return { originalUrl}
      }

      const error = unwrapEither(result)

      switch (error.name) {
        case UrlNotExist.name:
          return reply.status(404).send({ message: error.message })
        default:
          throw new Error('Internal server error')
      }
    }
  )
}
