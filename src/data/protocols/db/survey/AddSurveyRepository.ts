import { AddSurveyParams } from '../../../../domain/usecases/survey/AddSurvey'

export interface AddSurveyRepository {
  add: (data: AddSurveyParams) => Promise<void>
}
