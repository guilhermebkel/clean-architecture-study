export const signupPath = {
  post: {
    tags: ['Login'],
    summary: 'API for creating user accounts',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
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
              $ref: '#/schemas/account'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequestError'
      },
      404: {
        $ref: '#/components/notFoundError'
      },
      403: {
        $ref: '#/components/forbiddenError'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
