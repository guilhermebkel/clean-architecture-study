import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<void>
}
