import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'


export const createApp = ({ movieModel }) => {
    const app = express()

    app.use(json())
    app.use(corsMiddleware())

    app.disable('x-powered-by')

    // Desde el punto de entrada se le pasa el modelo a usar
    app.use('/movies', createMovieRouter({ movieModel: movieModel }))

    const PORT = process.env.PORT ?? 1234
    const HOST = process.env.HOST ?? "127.0.0.1"

    app.listen(PORT, HOST, () => {
        console.log(`Server running at http://localhost:${PORT}/`)
    })
}