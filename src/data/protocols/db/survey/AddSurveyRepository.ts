import { AddSurveyModel } from '../../../../domain/usecases/survey/AddSurvey'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
