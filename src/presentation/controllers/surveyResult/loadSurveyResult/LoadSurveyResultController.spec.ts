import MockDate from 'mockdate'
import { HttpRequest, LoadSurveyById, LoadSurveyResult } from '@/presentation/controllers/surveyResult/loadSurveyResult/LoadSurveyResultControllerProtocols'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/HttpHelper'
import { InvalidParamError } from '@/presentation/errors'
import { throwError, mockSurveyResultModel } from '@/domain/test'
import { mockLoadSurveyById, mockLoadSurveyResult } from '@/presentation/test'
import { LoadSurveyResultController } from '@/presentation/controllers/surveyResult/loadSurveyResult/LoadSurveyResultController'

const mockFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  loadSurveyResultStub: LoadSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const loadSurveyResultStub = mockLoadSurveyResult()
  const sut = new LoadSurveyResultController(
    loadSurveyByIdStub,
    loadSurveyResultStub
  )

  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultStub
  }
}

describe('LoadSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    const httpRequest = mockFakeRequest()

    await sut.handle(httpRequest)

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))

    const httpRequest = mockFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)

    const httpRequest = mockFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyResultStub } = makeSut()

    const loadByIdSpy = jest.spyOn(loadSurveyResultStub, 'load')

    const httpRequest = mockFakeRequest()

    await sut.handle(httpRequest)

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()

    const httpRequest = mockFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
