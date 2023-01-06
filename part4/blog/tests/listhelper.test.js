const listhelper = require('../utils/listhelper')

test('dummy returns one', () => {
    const blogs = []
    const results = listhelper.dummy(blogs)
    expect(results).toBe(1)
})