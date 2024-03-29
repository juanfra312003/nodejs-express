import express from 'express'
import logger from 'morgan'
import path from 'path'

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'

const app = express()
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + path.sep + 'client' + path.sep + 'index.html')
})

app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})