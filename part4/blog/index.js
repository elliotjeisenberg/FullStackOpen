require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./build/blog')
const blogsController = require('./controllers/blogs')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsController)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})