import { HttpRequest, HttpResponse } from '../protocols/Http'
import { MissingParamError } from '../errors/MissingParamError'
import { InvalidParamError } from '../errors/InvalidParamError'
import { badRequest } from '../helpers/HttpHelper'
import { Controller } from '../protocols/Controller'
import { EmailValidator } from '../protocols/EmailValidator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isEmailValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!isEmailValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
