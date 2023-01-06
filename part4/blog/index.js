const app = require('./app')
const http = require('http')
const server = http.createServer(app)

const PORT = 3005

server.listen(PORT, () => {
    console.log('listening on port ', PORT)
})