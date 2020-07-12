import { SaveSurveyResultRepository } from '@/data/protocols/db/surveyResult/SaveSurveyResultRepository'
import { SurveyResultModel, SaveSurveyResultParams } from '@/data/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResultProtocols'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  const saveSurveyResultRepositoryStub = new SaveSurveyResultRepositoryStub()

  return saveSurveyResultRepositoryStub
}
