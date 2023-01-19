const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../build/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('Cleared test database')

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save)
    await Promise.all(promiseArray)

    await api.get('/api/blogs')
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)



afterAll(() => {
    mongoose.connection.close()
})