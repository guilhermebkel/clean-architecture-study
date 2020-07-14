export const unauthorizedErrorComponent = {
  description: 'Unauthorized!',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
