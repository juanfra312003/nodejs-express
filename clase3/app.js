const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const cors = require('cors')
const z = require('zod')
const { validateMovie } = require('./schemas/movies')
const { validatePartialMovie } = require('./schemas/movies')



const app = express()

app.use(express.json()) // Middleware para parsear el body de las peticiones a JSON
app.use(cors())
app.disable('x-powered-by') // Deshabilitar el header 'x-powered-by'

// SOLUCIÓN ALTERNATIVA CORSE
/*
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    "http://localhost:1234"
]
*/

// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
    /*
    const origin = req.header('origin')

    // El !origin establece cuando no hay origen (La petición la hace el mismo servidor)
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }
    */


    const { genre } = req.query
    if (genre) {
        // El genero es un array, por consiguiente se debe mirar si se encuentra dentro
        const filteredMovies = movies.filter(
            //movie => movie.genre.includes(genre)
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }

    res.json(movies)
})

app.post('/movies', (req, res) => {

    const result = validateMovie(req.body)

    // Toma valores de error o success
    if (result.error) {
        return res.status(400).json({
            error: JSON.parse(result.error.message)
        })
    }

    const newMovie = {
        id: crypto.randomUUID(), //uuidv4()
        ...result.data
    }

    movies.push(newMovie)

    // Código de estado de creación de recursos (201)
    res.status(201).json(newMovie)
}
)

app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)

    // Si no se encuentra la película
    res.status(404).json({ message: 'Movie not found' })
})

/*
app.options('movies', (req, res) => {
    const origin = req.header('origin')

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    }
    res.send(200)
})
*/

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    movies.splice(movieIndex, 1);
    return res.status(204).send();
});

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (result.error) {
        return res.status(400).json({
            error: JSON.parse(result.error.message)
        })
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    // Obtener directamente el índice
    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})



const PORT = process.env.PORT ?? 1234
const HOST = process.env.HOST ?? "localhost"

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})