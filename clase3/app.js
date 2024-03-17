const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')


const app = express()

app.use(express.json()) // Middleware para parsear el body de las peticiones a JSON
app.disable('x-powered-by') // Deshabilitar el header 'x-powered-by'


// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
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
    const {
        title,
        director,
        year,
        duration,
        genre,
        rate,
        poster,
    } = req.body

    const newMovie = {
        id: crypto.randomUUID(), //uuidv4()
        title,
        genre,
        director,
        year,
        duration,
        rate: rate ?? 0,
        poster
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



const PORT = process.env.PORT ?? 1234
const HOST = process.env.HOST ?? "127.0.0.1"

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
})