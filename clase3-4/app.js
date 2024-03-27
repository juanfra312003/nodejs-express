import express, { json } from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies.js'

const app = express()

app.use(json()) // Middleware para parsear el body de las peticiones a JSON

app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:8080',
            "http://localhost:1234"
        ]


        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }

    }
}))

app.disable('x-powered-by') // Deshabilitar el header 'x-powered-by'

// Cuando se accede a los recursos de /movies, uso el router moviesRouter
app.use('/movies', moviesRouter)


const PORT = process.env.PORT ?? 1234
const HOST = process.env.HOST ?? "127.0.0.1"

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})