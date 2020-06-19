import { AddSurvey } from '../../../../domain/usecases/AddSurvey'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/surveyRepository/SurveyMongoRepository'
import { DbAddSurvey } from '../../../../data/usecases/AddSurvey/DbAddSurvey'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()

  const dbAddSurvey = new DbAddSurvey(surveyMongoRepository)

  return dbAddSurvey
}
