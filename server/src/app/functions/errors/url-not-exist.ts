export class UrlNotExist extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UrlNotExist'
  }
}
