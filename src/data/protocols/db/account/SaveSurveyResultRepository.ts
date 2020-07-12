import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult'
import { SurveyResultModel } from '@/domain/models/SurveyResult'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
