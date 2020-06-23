import { HttpRequest } from '../protocols'
import { forbidden } from '../helpers/http/HttpHelper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './AuthMiddleware'

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token is supplied by headers', async () => {
    const sut = new AuthMiddleware()

    const httpRequest: HttpRequest = {
      headers: {}
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
