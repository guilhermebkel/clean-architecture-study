import { ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelper'
import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/AddSurveyRepository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/LoadSurveysRepository'
import { SurveyModel } from '@/domain/models/Survey'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (data: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    await surveyCollection.insertOne(data)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    const surveys = await surveyCollection.find().toArray()

    return surveys && MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })

    return survey && MongoHelper.map(survey)
  }
}
