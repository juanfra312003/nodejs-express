import express from 'express'
import logger from 'morgan'
import path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('New connection')

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + path.sep + 'client' + path.sep + 'index.html')
})

server.listen(PORT, HOST, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})