import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

import env from '../config/env'
import app from '../config/app'

import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper'

let surveyCollection: Collection
let accountCollection: Collection

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

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'An answer.'
          }]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_mail@mail.com',
        password: 'any_password',
        role: 'admin'
      })

      const accountId = result.ops[0]._id

      const accessToken = sign({ id: accountId }, env.jwtSecret)

      await accountCollection.updateOne({
        _id: accountId
      }, {
        $set: {
          accessToken
        }
      })

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
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
