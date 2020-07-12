import { RequiredFieldValidation } from '@/validation/validators/RequiredFieldValidation'
import { MissingParamError } from '@/presentation/errors'

const makeSut = (): RequiredFieldValidation => {
  const sut = new RequiredFieldValidation('field')

  return sut
}

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({})

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return an error if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_value' })

    expect(error).toBeFalsy()
  })
})
