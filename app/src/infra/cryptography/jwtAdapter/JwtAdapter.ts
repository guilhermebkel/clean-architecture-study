import jwt from 'jsonwebtoken'

import { Encrypter } from '../../../data/protocols/cryptography/Encrypter'

export class JwtAdapter implements Encrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    jwt.sign({ id: value }, this.secret)

    return await Promise.resolve(null)
  }
}
