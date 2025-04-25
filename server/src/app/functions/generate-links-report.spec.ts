import { randomUUID } from 'node:crypto'
import { isRight, unwrapEither } from '@/infra/shared/either'
import * as upload from '@/infra/storage/export-csv-upload'
import { makeLink } from '@/test/factories/make-link'
import { uuidv7 } from 'uuidv7'
import { describe, expect, it, vi } from 'vitest'
import { generateLinksReport } from './generate-links-report'

describe('export links', () => {
  it('should be able to export links', async () => {
    const linkStub = vi
      .spyOn(upload, 'exportToCSVAndlinks')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'http://example.com/file.csv',
        }
      })

    const originalUrlPattern = `https://www.localhost.com/${uuidv7()}`

    const link1 = await makeLink({ originalUrl: originalUrlPattern })
    const link2 = await makeLink({ originalUrl: originalUrlPattern })
    const link3 = await makeLink({ originalUrl: originalUrlPattern })
    const link4 = await makeLink({ originalUrl: originalUrlPattern })
    const link5 = await makeLink({ originalUrl: originalUrlPattern })

    const sut = await generateLinksReport({
      searchQuery: originalUrlPattern,
    })

    const generatedCSVStream = linkStub.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).reportUrl).toBe('http://example.com/file.csv')
   expect(csvAsArray).toEqual([
      ['ID','OriginalUrl','ShortUrl','AccessCount','Created At'],
      [link1.id, link1.originalUrl, link1.shortUrl, link1.accessCount, expect.any(String)],
      [link2.id, link2.originalUrl, link2.shortUrl, link2.accessCount, expect.any(String)],
      [link3.id, link3.originalUrl, link3.shortUrl, link3.accessCount, expect.any(String)],
      [link4.id, link4.originalUrl, link4.shortUrl, link4.accessCount, expect.any(String)],
      [link5.id, link5.originalUrl, link5.shortUrl, link5.accessCount, expect.any(String)],
    ])
  })
})
