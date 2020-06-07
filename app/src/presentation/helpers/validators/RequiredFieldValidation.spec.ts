import { RequiredFieldValidation } from './RequiredFieldValidation'
import { MissingParamError } from '../../errors'

const makeSut = (): RequiredFieldValidation => {
  const sut = new RequiredFieldValidation('any_field')

  return sut
}

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({})

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({ any_field: true })

    expect(error).toBeFalsy()
  })
})
