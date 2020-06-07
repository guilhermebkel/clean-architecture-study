import { RequiredFieldValidation } from './RequiredFieldValidation'
import { MissingParamError } from '../../errors'

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

    const error = sut.validate({ field: true })

    expect(error).toBeFalsy()
  })
})
