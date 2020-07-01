import { MongoHelper } from '../helpers/MongoHelper'
import { AddSurveyModel } from '../../../../domain/usecases/AddSurvey'
import { AddSurveyRepository } from '../../../../data/protocols/db/survey/AddSurveyRepository'
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/LoadSurveysRepository'
import { SurveyModel } from '../../../../domain/models/Survey'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (data: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    await surveyCollection.insertOne(data)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    const surveys: SurveyModel[] = await surveyCollection.find().toArray()

    return surveys
  }
}
