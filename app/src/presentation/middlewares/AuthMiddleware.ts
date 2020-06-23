import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { forbidden } from '../helpers/http/HttpHelper'
import { AccessDeniedError } from '../errors'
import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']

    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }

    return forbidden(new AccessDeniedError())
  }
}
