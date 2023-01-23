const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsController = require('./controllers/blogs')
const usersController = require('./controllers/users')
const middleware = require('./utils/middleware')


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsController)
app.use('/api/users', usersController)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app