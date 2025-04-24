import { describe, it, expect } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { uuidv7 } from 'uuidv7'

import { createLink } from './create-link'
import { ShortURlAlreadyExists } from './errors/shortUrl-already-exists'
import { createLinkInput } from './create-link'

describe('createLink', () => {
  it('deve criar um link com sucesso', async () => {
    const shortUrl = `slug-${uuidv7()}`
    const originalUrl = `https://meusite.com/${shortUrl}`

    const result = await createLink({
      originalUrl,
      shortUrl,
    })

    expect(result.right).toBeDefined()
    expect(result.right?.originalUrl).toBe(originalUrl)
    expect(result.right?.shortUrl).toBe(shortUrl)

    // Verifica se foi salvo no banco
    const linkInDb = await db.query.links.findFirst({
      where: eq(schema.links.shortUrl, shortUrl),
    })

    expect(linkInDb).toBeDefined()
    expect(linkInDb?.originalUrl).toBe(originalUrl)
  })

  it('não deve permitir shortUrl duplicado', async () => {
    const shortUrl = `duplicado-${uuidv7()}`
    const originalUrl = `https://original.com/${shortUrl}`

    // Cria o primeiro
    await createLink({ originalUrl, shortUrl })

    // Tenta criar outro com o mesmo shortUrl
    const result = await createLink({
      originalUrl: 'https://outro-site.com',
      shortUrl,
    })

    expect(result.left).toBeInstanceOf(ShortURlAlreadyExists)
  })

  it('deve falhar com originalUrl inválido', async () => {
    const invalidData = {
      originalUrl: 'sem-protocolo', // inválida
      shortUrl: `test-${uuidv7()}`,
    }

    expect(() => createLinkInput.parse(invalidData)).toThrowError()
  })

  it('deve falhar com shortUrl muito curta', async () => {
    const invalidData = {
      originalUrl: 'https://site.com',
      shortUrl: 'a', // muito curta
    }

    expect(() => createLinkInput.parse(invalidData)).toThrowError()
  })

  it('deve falhar com shortUrl em formato inválido', async () => {
    const invalidData = {
      originalUrl: 'https://site.com',
      shortUrl: 'slug!@#$', // caracteres inválidos
    }

    expect(() => createLinkInput.parse(invalidData)).toThrowError()
  })
})
