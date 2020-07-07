import MockDate from 'mockdate'
import { LoadSurveyByIdRepository, SurveyModel } from './DbLoadSurveyByIdProtocols'
import { DbLoadSurveyById } from './DbLoadSurveyById'

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return await Promise.resolve(makeFakeSurvey())
    }
  }

  const loadSurveyByIdRepository = new LoadSurveyByIdRepositoryStub()

  return loadSurveyByIdRepository
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepository: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepository = makeLoadSurveyByIdRepository()
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

    expect(surveys).toEqual(makeFakeSurvey())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()

    jest.spyOn(loadSurveyByIdRepository, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.loadById('any_id')

    await expect(promise).rejects.toThrow()
  })
})
