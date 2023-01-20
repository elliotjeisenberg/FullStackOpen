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
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('blog list tests', () => {
    test('blogs are returned as json', async () => {
        const result = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)
    
        expect(result.body.length).toBe(helper.initialBlogs.length)
    })

    test('unique identifier is "id"', async () => {
        const result = await api
            .get('/api/blogs')
        
        const uniqueIDList = {}

        //check that each blog has an id and add that to the id hash
        const blogs = result.body
        blogs.forEach((blog) => {
            expect(blog.id).toBeDefined()
            uniqueIDList[blog.id] = null
        })

        //check that no id was added to the unique list more than once
        const totalUniqueIDs = Object.keys(uniqueIDList).length
        expect(totalUniqueIDs).toBe(helper.initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})