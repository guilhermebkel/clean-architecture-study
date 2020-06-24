import { LoadAccountByToken } from '../../../domain/usecases/LoadAccountByToken'
import { AccountModel } from '../../../domain/models/Account'
import { Decrypter } from '../../protocols/cryptography/Decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/LoadAccountByTokenRepository copy'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const decoded = await this.decrypter.decrypt(accessToken)

    if (decoded) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    }

    return null
  }
}
