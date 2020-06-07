import { Validation } from './Validation'
import { EmailValidator } from '../../protocols/EmailValidator'
import { InvalidParamError } from '../../errors'

export class EmailValidation implements Validation {
  private readonly fieldName: string
  private readonly emailValidator: EmailValidator

  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    const isEmailValid = this.emailValidator.isValid(input[this.fieldName])

    if (!isEmailValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
