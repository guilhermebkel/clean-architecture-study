import { SurveyAnswerModel } from '../models/Survey'

export type AddSurveyModel = Omit<SurveyAnswerModel, 'id'>

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}
