const Blog = require('../build/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log('returning blog ', blog)
  response.json(blog)
})
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  })

module.exports = blogsRouter

  //api/blogs