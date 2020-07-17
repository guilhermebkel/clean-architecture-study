import { SaveSurveyResultRepository } from '@/data/protocols/db/surveyResult/SaveSurveyResultRepository'
import { SurveyResultModel, SaveSurveyResultParams } from '@/data/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResultProtocols'
import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/LoadSurveyResultRepository'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  const saveSurveyResultRepositoryStub = new SaveSurveyResultRepositoryStub()

  return saveSurveyResultRepositoryStub
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()

  return loadSurveyResultRepositoryStub
}
