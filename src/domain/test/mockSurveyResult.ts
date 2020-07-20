import { SurveyResultModel } from '@/domain/models/SurveyResult'
import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult'

export const mockSurveyResultData = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 0,
    percent: 0
  }, {
    answer: 'other_answer',
    image: 'any_image',
    count: 0,
    percent: 0
  }],
  date: new Date()
})
