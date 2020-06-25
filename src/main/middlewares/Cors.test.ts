import request from 'supertest'

import app from '../config/app'

describe('CorsMiddleware', () => {
  test('Should enable cors', async () => {
    app.get('/test-cors', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .get('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
