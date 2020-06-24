
import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/Validation'

export const makeAddSurveyValidation = (): Validation => {
  const validations: Validation[] = []

  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }

  const validationComposite = new ValidationComposite(validations)

  return validationComposite
}
