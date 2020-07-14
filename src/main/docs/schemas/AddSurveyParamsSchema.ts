export const addSurveyParamsSchema = {
  type: 'object',
  properties: {
    answers: {
      type: 'string'
    },
    question: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    }
  }
}
