import { SaveSurveyResultModel } from '@/domain/usecases/SaveSurveyResult'
import { SurveyResultModel } from '@/domain/models/SurveyResult'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
