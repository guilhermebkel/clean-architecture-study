import { LogControllerDecorator } from '@/main/decorators/LogControllerDecorator'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, ok } from '@/presentation/helpers/http/HttpHelper'
import { LogErrorRepository } from '@/data/protocols/db/log/LogErrorRepository'
import { mockAccountModel } from '@/domain/test'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const fakeAccount = mockAccountModel()

      const httpResponse: HttpResponse = ok(fakeAccount)

      return await Promise.resolve(httpResponse)
    }
  }

  const controllerStub = new ControllerStub()

  return controllerStub
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await Promise.resolve()
    }
  }

  const logErrorRepositoryStub = new LogErrorRepositoryStub()

  return logErrorRepositoryStub
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    logErrorRepositoryStub,
    controllerStub,
    sut
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { controllerStub, sut } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest: HttpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(handleSpy).toBeCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = makeFakeRequest()
    const fakeAccount = mockAccountModel()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(fakeAccount))
  })

  test('Should call LogErrorRepository with correct error if controller returns a ServerError', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    const error = serverError(fakeError)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(error))

    const httpRequest: HttpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(logSpy).toBeCalledWith('any_stack')
  })
})
