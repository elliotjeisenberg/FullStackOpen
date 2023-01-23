const Blog = require('../build/blog')
const User = require('../build/user')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  blog
    ? response.json(blog)
    : response.status(400).end()
})
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body

    //const user = await User.findById(body.userId)
    const user = await User.findOne()
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes:body.likes,
      user: user._id
    })

    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()

    response.status(201).json(newBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id)
    response.status(202).json(result)
  })

  blogsRouter.put('/:id', async (request, response) => {
    const updates = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, updates, {new: true})
    response.status(200).json(result)
  })



module.exports = blogsRouter

  //api/blogs