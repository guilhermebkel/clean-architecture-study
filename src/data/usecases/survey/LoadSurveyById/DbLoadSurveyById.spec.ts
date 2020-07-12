import MockDate from 'mockdate'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/LoadSurveyById/DbLoadSurveyByIdProtocols'
import { DbLoadSurveyById } from '@/data/usecases/survey/LoadSurveyById/DbLoadSurveyById'
import { throwError, mockSurveyModel } from '@/domain/test'
import { mockLoadSurveyByIdRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepository: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepository = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepository)

  return {
    sut,
    loadSurveyByIdRepository
  }
}

describe('DBLoadSurveyById Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()

    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepository, 'loadById')

    await sut.loadById('any_id')

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return a survey on success', async () => {
    const { sut } = makeSut()

    const surveys = await sut.loadById('any_id')

    expect(surveys).toEqual(mockSurveyModel())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()

    jest.spyOn(loadSurveyByIdRepository, 'loadById').mockImplementationOnce(throwError)

    const promise = sut.loadById('any_id')

    await expect(promise).rejects.toThrow()
  })
})
