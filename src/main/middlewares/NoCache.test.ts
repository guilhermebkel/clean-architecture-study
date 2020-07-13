import request from 'supertest'

import { noCache } from '@/main/middlewares/NoCache'

import app from '@/main/config/app'

describe('NoCacheMiddleware', () => {
  test('Should enable cors', async () => {
    app.get('/test-no-cache', noCache, (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .get('/test-no-cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
