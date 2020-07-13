import { makeSignUpValidation } from './SignUpValidationFactory'
import { ValidationComposite, EmailValidation, RequiredFieldValidation, CompareFieldsValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/Validation'
import { mockEmailValidator } from '@/validation/test'

jest.mock('@/validation/validators/ValidationComposite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    validations.push(new EmailValidation('email', mockEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
