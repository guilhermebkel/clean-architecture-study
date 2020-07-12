import { SurveyModel } from '@/domain/models/Survey'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}
