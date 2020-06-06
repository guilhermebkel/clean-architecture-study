import { Controller } from '../../protocols/Controller'
import { HttpRequest, HttpResponse } from '../../protocols/Http'

import { badRequest } from '../../helpers/HttpHelper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { EmailValidator } from '../signup/SignUpProtocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    if (!email) {
      return await Promise.resolve(badRequest(new MissingParamError('email')))
    }

    if (!password) {
      return await Promise.resolve(badRequest(new MissingParamError('password')))
    }

    const isValid = this.emailValidator.isValid(email)

    if (!isValid) {
      return await Promise.resolve(badRequest(new InvalidParamError('email')))
    }
  }
}
