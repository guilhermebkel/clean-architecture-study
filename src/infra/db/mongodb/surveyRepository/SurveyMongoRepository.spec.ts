import { Collection } from 'mongodb'

import { MongoHelper } from '../helpers/MongoHelper'

import { SurveyMongoRepository } from './SurveyMongoRepository'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

let surveyCollection: Collection

describe('SurveyMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')

    await surveyCollection.deleteMany({})
  })

  test('Should add a survey on success', async () => {
    const sut = makeSut()

    await sut.add({
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }],
      date: new Date()
    })

    const survey = await surveyCollection.findOne({ question: 'any_question' })

    expect(survey).toBeTruthy()
  })
})
