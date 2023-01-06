const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to Mongo')
}).catch( err => {
    console.log(err)
}
)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/blogs', blogRouter)

module.exports = app