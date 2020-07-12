import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/Validation'
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter'

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  const validationComposite = new ValidationComposite(validations)

  return validationComposite
}
