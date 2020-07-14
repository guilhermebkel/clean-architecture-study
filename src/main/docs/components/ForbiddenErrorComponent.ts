export const forbiddenErrorComponent = {
  description: 'Access Denied!',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
