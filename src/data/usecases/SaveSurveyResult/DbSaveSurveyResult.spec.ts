import MockDate from 'mockdate'
import { DbSaveSurveyResult } from './DbSaveSurveyResult'
import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from './DbSaveSurveyResultProtocols'

const makeFakeSurveyResult = (): SaveSurveyResultModel => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  question: 'any_question',
  date: new Date()
})

const makeFakeSurveyResultData = (): SurveyResultModel => ({
  ...makeFakeSurveyResult(),
  id: 'any_id'
})

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await Promise.resolve(makeFakeSurveyResultData())
    }
  }

  const saveSurveyResultRepositoryStub = new SaveSurveyResultRepositoryStub()

  return saveSurveyResultRepositoryStub
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DBSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')

    const surveyResultData = makeFakeSurveyResult()

    await sut.save(surveyResultData)

    expect(addSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { saveSurveyResultRepositoryStub, sut } = makeSut()

    jest.spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const surveyResultData = makeFakeSurveyResult()

    const promise = sut.save(surveyResultData)

    await expect(promise).rejects.toThrow()
  })
})
