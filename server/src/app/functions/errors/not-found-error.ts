// NotFoundError.ts
export class NotFoundError extends Error {
  constructor() {
    super('Link não encontrado')
    this.name = 'NotFoundError'
  }

  // Você pode adicionar uma estrutura que permita serialização aqui
  toJSON() {
    return { message: this.message }
  }
}
