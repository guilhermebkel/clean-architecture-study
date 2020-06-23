import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { forbidden, ok } from '../helpers/http/HttpHelper'
import { AccessDeniedError } from '../errors'
import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']

    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)

      if (account) {
        return ok({ accountId: account.id })
      }
    }

    return forbidden(new AccessDeniedError())
  }
}
