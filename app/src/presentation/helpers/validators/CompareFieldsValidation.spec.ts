import { CompareFieldsValidation } from './CompareFieldsValidation'
import { InvalidParamError } from '../../errors'

const makeSut = (): CompareFieldsValidation => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')

  return sut
}

describe('CompareFieldsValidation', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value_to_compare'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return an error if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })

    expect(error).toBeFalsy()
  })
})
