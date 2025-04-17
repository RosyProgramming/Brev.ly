export class ShortURlAlreadyExists extends Error {
    constructor() {
        super('Short URL already exists')
    }
}