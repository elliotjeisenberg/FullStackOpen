const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
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