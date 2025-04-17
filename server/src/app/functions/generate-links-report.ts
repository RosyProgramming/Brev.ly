import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { exportToCSVAndUpload } from '@/infra/storage/export-csv-upload'
import { asc } from 'drizzle-orm'

export async function generateLinksReport() {
  const links = await db
    .select()
    .from(schema.links)
    .orderBy(asc(schema.links.createdAt))

  const columns = [
    'id',
    'Short URL',
    'Original URL',
    'Access Count',
    'Created At',
  ]

  const rows = links.map(link => [
    link.id,
    link.shortUrl,
    link.originalUrl,
    link.accessCount.toString(),
    link.createdAt.toISOString(),
  ])

  const report = await exportToCSVAndUpload({
    folder: 'reports',
    fileName: 'relatorio-links',
    columns,
    rows,
  })

  return report
}
