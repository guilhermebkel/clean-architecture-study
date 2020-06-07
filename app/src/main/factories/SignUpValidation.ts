
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'
import { Validation } from '../../presentation/helpers/validators/Validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/CompareFieldsValidation'

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  const validationComposite = new ValidationComposite(validations)

  return validationComposite
}
