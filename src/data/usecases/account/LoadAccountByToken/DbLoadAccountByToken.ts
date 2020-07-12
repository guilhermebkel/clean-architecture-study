import { LoadAccountByToken, AccountModel, Decrypter, LoadAccountByTokenRepository } from '@/data/usecases/account/LoadAccountByToken/DbLoadAccountByTokenProtocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const decoded = await this.decrypter.decrypt(accessToken)

    if (decoded) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)

      if (account) {
        return account
      }
    }

    return null
  }
}
