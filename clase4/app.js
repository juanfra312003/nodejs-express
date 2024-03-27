import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

app.use(json()) // Middleware para parsear el body de las peticiones a JSON
app.use(corsMiddleware()) // Middleware para manejar CORS

app.disable('x-powered-by') // Deshabilitar el header 'x-powered-by'

// Cuando se accede a los recursos de /movies, uso el router moviesRouter
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234
const HOST = process.env.HOST ?? "127.0.0.1"

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})