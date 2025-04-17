import { generateLinksReport } from '@/app/functions/generate-links-report'
import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'

export const generateReport: FastifyPluginAsync = async server => {
  server.get(
    '/link/report',
    {
      schema: {
        summary: 'Export links in CSV',
        tags: ['links'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
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
        message: 'Report generated successfully!',
      })
    }
  )
}
