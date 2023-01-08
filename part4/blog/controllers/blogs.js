const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            console.log('post request was attempted to be saved')
            response.status(201).json(result)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = blogRouter