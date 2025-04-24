import { generateLinksReport } from '@/app/functions/generate-links-report'
import { unwrapEither  } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const generateReport: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link/report',
    {
      schema: {
        summary: 'Export links in CSV',
        tags: ['links'],
        response: {
          200: z.object({
            url: z.string().describe("URL to download the report"),
          }),
          500: z.object({ message: z.string() }).describe("Internal server error")
        },
      },
    },
    async (request, reply) => {
      const report = await generateLinksReport()

      const { url } = unwrapEither(report)

      return reply.status(200).send({ url })

    }
  )
}
