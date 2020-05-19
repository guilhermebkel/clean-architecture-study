import { SignUpController } from './SignUp'
import { MissingParamError } from '../errors/MissingParamError'

const makeSut = (): SignUpController => new SignUpController()

describe('SignUpController', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        email: 'any@any.com',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'any',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})

test('Should return 400 if no password is provided', () => {
  const sut = makeSut()

  const httpRequest = {
    body: {
      name: 'any',
      email: 'any@any.com',
      passwordConfirmation: '123456'
    }
  }

  const httpResponse = sut.handle(httpRequest)

  expect(httpResponse.statusCode).toBe(400)
  expect(httpResponse.body).toEqual(new MissingParamError('password'))
})

test('Should return 400 if no passwordConfirmation is provided', () => {
  const sut = makeSut()

  const httpRequest = {
    body: {
      name: 'any',
      email: 'any@any.com',
      password: '123456'
    }
  }

  const httpResponse = sut.handle(httpRequest)

  expect(httpResponse.statusCode).toBe(400)
  expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
})
