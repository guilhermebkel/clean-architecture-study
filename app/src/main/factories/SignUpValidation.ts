
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite'
import { Validation } from '../../presentation/helpers/validators/Validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  const validationComposite = new ValidationComposite(validations)

  return validationComposite
}
