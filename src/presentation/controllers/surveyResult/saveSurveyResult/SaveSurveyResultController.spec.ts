import MockDate from 'mockdate'
import { HttpRequest, SurveyModel, LoadSurveyById } from './SaveSurveyResultControllerProtocols'
import { SaveSurveyResultController } from './SaveSurveyResultController'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await Promise.resolve(makeFakeSurvey())
    }
  }

  const loadSurveyByIdStub = new LoadSurveyByIdStub()

  return loadSurveyByIdStub
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)

  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
