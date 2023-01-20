const Blog = require('../build/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  blog
    ? response.json(blog)
    : response.status(400).end()
})
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id)
    response.status(202).json(result)
  })

module.exports = blogsRouter

  //api/blogs