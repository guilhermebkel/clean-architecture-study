import MockDate from 'mockdate'
import { DbAddSurvey } from '@/data/usecases/survey/AddSurvey/DbAddSurvey'
import { AddSurveyRepository } from '@/data/usecases/survey/AddSurvey/DbAddSurveyProtocols'
import { throwError, mockAddSurveyParams } from '@/domain/test'
import { mockAddSurveyRepository } from '@/data/test'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DBAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    const surveyData = mockAddSurveyParams()

    await sut.add(surveyData)

    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { addSurveyRepositoryStub, sut } = makeSut()

    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)

    const surveyData = mockAddSurveyParams()

    const promise = sut.add(surveyData)

    await expect(promise).rejects.toThrow()
  })
})
