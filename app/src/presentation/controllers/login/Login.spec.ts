import { LoginController } from './Login'

import { badRequest } from '../../helpers/HttpHelper'
import { MissingParamError } from '../../errors'

describe('LoginController', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginController()

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
