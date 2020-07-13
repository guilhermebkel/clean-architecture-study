import { AddAccount, AccountModel, AddAccountParams } from '@/presentation/controllers/login/signup/SignUpControllerProtocols'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/presentation/controllers/login/login/LoginControllerProtocols'
import { LoadAccountByToken } from '@/presentation/middlewares/AuthMiddlewareProtocols'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }

  return new AuthenticationStub()
}

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel()

      return await new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      const account = mockAccountModel()

      return await Promise.resolve(account)
    }
  }

  const loadAccountByTokenStub = new LoadAccountByTokenStub()

  return loadAccountByTokenStub
}
