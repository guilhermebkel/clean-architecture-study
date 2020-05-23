import validator from 'validator'

import { EmailValidator } from '../presentation/protocols/EmailValidator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
