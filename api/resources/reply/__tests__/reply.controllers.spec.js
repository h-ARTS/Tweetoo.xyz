import controllers from '../reply.controllers'

describe('reply controllers:', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getOne',
      'getAll',
      'createOne',
      'updateOne',
      'removeOne'
    ]

    crudMethods.forEach(method => {
      expect(typeof controllers[method]).toBe('function')
    })
  })
})
