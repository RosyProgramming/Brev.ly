import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'
import { env } from '@/env'
import { Upload } from '@aws-sdk/lib-storage'
import { z } from 'zod'
import { r2 } from './client'

const exportCSVParamsSchema = z.object({
  folder: z.enum(['reports', 'exports']),
  fileName: z.string().min(1),
  columns: z.array(z.string()).min(1),
  rows: z.array(z.array(z.string())).min(1),
})

type ExportCSVParams = z.input<typeof exportCSVParamsSchema>

function escapeCSVValue(value: string): string {
  // Se o valor tiver ;, ", ou quebra de linha, envolve em aspas duplas e escapa as aspas
  if (value.includes(';') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function createCSVStream(columns: string[], rows: string[][]): Readable {
  const delimiter = ';' // Excel PT-BR espera ponto e vírgula

  const header = columns.map(escapeCSVValue).join(delimiter)
  const dataRows = rows.map(row => row.map(escapeCSVValue).join(delimiter))

  const allLines = [header, ...dataRows].join('\r\n')

  // Adiciona BOM no início do conteúdo para o Excel reconhecer UTF-8 corretamente
  const csvContent = `\uFEFF${allLines}`

  return Readable.from([csvContent])
}

export async function exportToCSVAndUpload(input: ExportCSVParams) {
  const { folder, fileName, columns, rows } = exportCSVParamsSchema.parse(input)

  const csvStream = createCSVStream(columns, rows)

  const uniqueFileName = `${folder}/${randomUUID()}-${fileName}.csv`

  const upload = new Upload({
    client: r2,
    params: {
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: uniqueFileName,
      Body: csvStream,
      ContentType: 'text/csv',
    },
  })

  await upload.done()

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  }
}
