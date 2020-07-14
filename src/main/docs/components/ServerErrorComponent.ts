export const serverErrorComponent = {
  description: 'Server error',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
