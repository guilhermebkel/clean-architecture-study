import { SaveSurveyResult } from '@/domain/usecases/surveyResult/SaveSurveyResult'
import { DbSaveSurveyResult } from '@/data/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResult'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/surveyResultRepository/SurveyResultMongoRepository'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()

  const dbSaveSurveyResult = new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)

  return dbSaveSurveyResult
}
