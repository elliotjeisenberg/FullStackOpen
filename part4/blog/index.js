const app = require('./app')
const http = require('http')
const server = http.createServer(app)
const config = require('./utils/config')

const PORT = config.PORT

server.listen(PORT, () => {
    console.log('listening on port ', PORT)
})