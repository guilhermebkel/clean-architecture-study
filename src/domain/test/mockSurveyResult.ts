import { SurveyResultModel } from '@/domain/models/SurveyResult'
import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult'

export const mockSurveyResultData = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  ...mockSurveyResultData(),
  id: 'any_id'
})
