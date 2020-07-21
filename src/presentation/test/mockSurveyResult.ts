import { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '@/presentation/controllers/surveyResult/saveSurveyResult/SaveSurveyResultControllerProtocols'
import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResult } from '@/presentation/controllers/surveyResult/loadSurveyResult/LoadSurveyResultControllerProtocols'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  const saveSurveyStub = new SaveSurveyStub()

  return saveSurveyStub
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  const loadSurveyResultStub = new LoadSurveyResultStub()

  return loadSurveyResultStub
}
