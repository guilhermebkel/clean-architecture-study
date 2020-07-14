export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'API for authenticating users',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
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
      401: {
        $ref: '#/components/unauthorizedError'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
