const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { update } = require('../build/blog')
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

    test('can grab a blog by its ID', async () => {
        const savedBlog = helper.initialBlogs[0]
        console.log(savedBlog._id)
        const result = await api
            .get(`/api/blogs/${savedBlog._id}`)
            .expect(200)
            .expect('Content-Type',/application\/json/)
        expect(result.body.id).toBe(savedBlog._id)
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

    test('making a blog post request creates a new blog post', async () => {
        const newBlog = {
            title: "My New Blog Post",
            author: "Elliot Eisenberg",
            url: "http://www.reggie.html",
            likes: 1,
          }
        
        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const blogs = response.body.map(b => b.title)
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(blogs).toContain('My New Blog Post')
    })

    test('if "likes" property is missing from post request, it will default to 0', async () => {
        const newBlog = {
            title: "Blog with no likes",
            author: "Elliot Eisenberg",
            url: "http://www.reggie.html"
          }
        
        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get(`/api/blogs/${result.body.id}`)
        expect(response.body.likes).toBe(0)
        
    })

    test('if "url" or "title" properties are empty, reject with 400 Bad Request', async () => {
        const newBlogWithoutURL = {
            title: "Blog with no URL",
            author: "Elliot Eisenberg",
            likes: 10
          }

        let result = await api
          .post('/api/blogs')
          .send(newBlogWithoutURL)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const newBlogWithoutTitle = {
            url: "http://www.reggie.html",
            author: "Elliot Eisenberg",
            likes: 10
        }

        result = await api
          .post('/api/blogs')
          .send(newBlogWithoutTitle)
          .expect(400)
          .expect('Content-Type', /application\/json/)
          
    })

    test('delete by id', async () => {
        const blogToDelete = helper.initialBlogs[0]
        const result = await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .expect(202)
        
        await api
            .get(`/api/blogs/${result.body.id}`)
            .expect(400)
    })


    test('update by id', async () => {
        let blogToUpdate = helper.initialBlogs[0]
        const updates = {
            title: 'UPDATED TITLE',
            likes: 9999
        }
        const result = await api
            .put(`/api/blogs/${blogToUpdate._id}`)
            .send(updates)
            .expect(200)

        const updatedBlog = result.body
        blogToUpdate.id = blogToUpdate._id
        delete blogToUpdate._id
        delete blogToUpdate.__v
        blogToUpdate = {...blogToUpdate, title:updates.title, likes:updates.likes}
        expect(updatedBlog).toEqual(blogToUpdate)
    })

})


afterAll(() => {
    mongoose.connection.close()
})