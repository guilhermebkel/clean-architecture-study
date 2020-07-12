import MockDate from 'mockdate'
import { DbSaveSurveyResult } from '@/data/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResult'
import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResultProtocols'
import { throwError } from '@/domain/test'

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => ({
  ...makeFakeSurveyResultData(),
  id: 'any_id'
})

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(makeFakeSurveyResult())
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

    const surveyResultData = makeFakeSurveyResultData()

    await sut.save(surveyResultData)

    expect(addSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { saveSurveyResultRepositoryStub, sut } = makeSut()

    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)

    const surveyResultData = makeFakeSurveyResultData()

    const promise = sut.save(surveyResultData)

    await expect(promise).rejects.toThrow()
  })

  test('Should return a SurveyResult on success', async () => {
    const { sut } = makeSut()

    const surveyResultData = makeFakeSurveyResultData()

    const surveyResult = await sut.save(surveyResultData)

    expect(surveyResult).toEqual(makeFakeSurveyResult())
  })
})
