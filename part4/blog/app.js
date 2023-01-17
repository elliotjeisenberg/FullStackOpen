const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./build/blog')
const blogsController = require('./controllers/blogs')
const config = require('./config/config')


mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsController)

module.exports = app