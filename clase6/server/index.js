import express from 'express'
import logger from 'morgan'
import path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: {}
    }
})

const db = createClient({
    url: "libsql://handy-galvatron-juanfra312003.turso.io",
    authToken: process.env.DB_TOKEN
})

await db.execute('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)')

io.on('connection', async (socket) => {
    console.log('New connection')

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('chat message', async (msg) => {
        let result
        try {
            result = await db.execute({
                sql: 'INSERT INTO messages (content) VALUES (:msg)',
                args: { msg }
            })
        } catch (e) {
            console.error(e)
            return
        }

        // Emitir (Broadcast)
        io.emit('chat message', msg, result.lastInsertRowid.toString())
    })


    // Recuperar los mensajes sin conexión
    if (!socket.recovered) {
        try {
            const results = await db.execute({
                sql: 'SELECT id, content FROM messages WHERE id > ?',
                args: [socket.handshake.auth.serverOffset || 0]
            })

            // Emitir cada línea a nivel
            results.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString())
            })
        } catch (e) {
            console.error(e)
            return
        }
    }
})

app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + path.sep + 'client' + path.sep + 'index.html')
})

server.listen(PORT, HOST, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})