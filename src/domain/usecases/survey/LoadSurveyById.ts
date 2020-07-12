import { SurveyModel } from '@/domain/models/Survey'

export interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}
