import { SurveyResultModel } from '@/domain/models/SurveyResult'

export interface LoadSurveyResult {
  load: (surveyId: string) => Promise<SurveyResultModel>
}
