export const surveyPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Survey'],
    summary: 'API for listing all surveys',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addSurveyParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbiddenError'
      },
      404: {
        $ref: '#/components/notFoundError'
      },
      401: {
        $ref: '#/components/unauthorizedError'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Survey'],
    summary: 'API for creating a survey',
    responses: {
      204: {
        description: 'Success'
      },
      403: {
        $ref: '#/components/forbiddenError'
      },
      400: {
        $ref: '#/components/badRequestError'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
