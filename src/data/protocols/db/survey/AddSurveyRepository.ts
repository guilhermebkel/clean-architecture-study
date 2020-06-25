import { AddSurveyModel } from '../../../../domain/usecases/AddSurvey'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
