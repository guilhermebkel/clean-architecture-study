import request from 'supertest'
import { Collection } from 'mongodb'

import app from '../config/app'

import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper'

let surveyCollection: Collection

describe('SurveyRoutes', () => {
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

  describe('POST /surveys', () => {
    test('Should return 204 on add survey success', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'An answer.'
          }]
        })
        .expect(204)
    })
  })
})
