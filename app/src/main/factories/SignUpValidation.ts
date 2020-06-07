
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'
import { Validation } from '../../presentation/helpers/validators/Validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/CompareFieldsValidation'
import { EmailValidation } from '../../presentation/helpers/validators/EmailValidation'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'

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
