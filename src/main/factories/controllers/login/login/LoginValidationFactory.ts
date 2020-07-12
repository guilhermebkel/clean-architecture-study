
import { ValidationComposite, EmailValidation, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/Validation'
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter'

export const makeLoginValidation = (): Validation => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  const validationComposite = new ValidationComposite(validations)

  return validationComposite
}
