import jwt from 'jsonwebtoken'

import { Encrypter } from '../../../data/protocols/cryptography/Encrypter'
import { Decrypter } from '../../../data/protocols/cryptography/Decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)

    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    const decoded = jwt.verify(value, this.secret)

    return decoded as string
  }
}
