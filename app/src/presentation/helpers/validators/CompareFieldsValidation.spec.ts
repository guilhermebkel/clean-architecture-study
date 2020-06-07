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
      field: '123',
      fieldToCompare: '321'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return an error if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: '123',
      fieldToCompare: '123'
    })

    expect(error).toBeFalsy()
  })
})
