import { HttpRequest } from '../protocols'
import { forbidden, ok } from '../helpers/http/HttpHelper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './AuthMiddleware'
import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken'
import { AccountModel } from '../../domain/models/Account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      const account = makeFakeAccount()

      return await Promise.resolve(account)
    }
  }

  const loadAccountByTokenStub = new LoadAccountByTokenStub()

  return loadAccountByTokenStub
}

interface SutTypes {
  loadAccountByTokenStub: LoadAccountByToken
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub)

  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token is supplied by headers', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return 403 if no LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })
})
