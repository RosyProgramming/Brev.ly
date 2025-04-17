import { generateLinksReport } from '@/app/functions/generate-links-report'
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
            url: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const report = await generateLinksReport()

      return reply.status(200).send({
        url: report.url,
      })
    }
  )
}
