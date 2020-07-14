export const surveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    answers: {
      type: 'string'
    },
    question: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    },
    date: {
      type: 'string'
    }
  }
}
