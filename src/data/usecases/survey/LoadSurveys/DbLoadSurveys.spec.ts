import MockDate from 'mockdate'
import { LoadSurveysRepository } from '@/data/usecases/survey/LoadSurveys/DbLoadSurveysProtocols'
import { DbLoadSurveys } from '@/data/usecases/survey/LoadSurveys/DbLoadSurveys'
import { throwError, mockSurveyModels } from '@/domain/test'
import { mockLoadSurveysRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepository: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepository = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepository)

  return {
    sut,
    loadSurveysRepository
  }
}

describe('DBLoadSurveys Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepository } = makeSut()

    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')

    await sut.load()

    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of surveys on success', async () => {
    const { sut } = makeSut()

    const surveys = await sut.load()

    expect(surveys).toEqual(mockSurveyModels())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepository } = makeSut()

    jest.spyOn(loadSurveysRepository, 'loadAll').mockImplementationOnce(throwError)

    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })
})
