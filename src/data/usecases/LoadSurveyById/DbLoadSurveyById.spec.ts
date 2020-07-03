import MockDate from 'mockdate'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/LoadSurveyByIdRepository'
import { SurveyModel } from '../../../domain/models/Survey'
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
})
