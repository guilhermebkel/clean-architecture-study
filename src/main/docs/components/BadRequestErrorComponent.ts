export const badRequestErrorComponent = {
  description: 'Invalid request',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
