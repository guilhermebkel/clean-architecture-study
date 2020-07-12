import { AddAccountRepository } from '@/data/protocols/db/account/AddAccountRepository'
import { AccountModel, AddAccountParams, LoadAccountByEmailRepository } from '@/data/usecases/account/AddAccount/DbAddAccountProtocols'
import { mockAccountModel } from '@/domain/test'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/LoadAccountByTokenRepository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/UpdateAccessTokenRepository'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel()

      return await Promise.resolve(fakeAccount)
    }
  }

  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      const account: AccountModel = mockAccountModel()

      return await Promise.resolve(account)
    }
  }

  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()

  return loadAccountByEmailRepositoryStub
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }

  const loadAccountByTokenRepositoryStub = new LoadAccountByTokenRepositoryStub()

  return loadAccountByTokenRepositoryStub
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {}
  }

  const updateAccessTokenRepositoryStub = new UpdateAccessTokenRepositoryStub()

  return updateAccessTokenRepositoryStub
}
