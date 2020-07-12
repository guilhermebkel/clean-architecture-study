import MockDate from 'mockdate'
import { DbSaveSurveyResult } from '@/data/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResult'
import { SaveSurveyResultRepository } from '@/data/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResultProtocols'
import { throwError, mockSurveyResultModel, mockSurveyResultData } from '@/domain/test'
import { mockSaveSurveyResultRepository } from '@/data/test'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
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

    const surveyResultData = mockSurveyResultData()

    await sut.save(surveyResultData)

    expect(addSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { saveSurveyResultRepositoryStub, sut } = makeSut()

    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)

    const surveyResultData = mockSurveyResultData()

    const promise = sut.save(surveyResultData)

    await expect(promise).rejects.toThrow()
  })

  test('Should return a SurveyResult on success', async () => {
    const { sut } = makeSut()

    const surveyResultData = mockSurveyResultData()

    const surveyResult = await sut.save(surveyResultData)

    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
