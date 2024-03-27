// Rutas de películas
import { moviesRouter } from 'express'
import { readJSON } from './utils'
import { randomUUID } from 'crypto'
import { validateMovie } from './schemas/movies'
import { validatePartialMovie } from '../schemas/movies'
const movies = readJSON('./movies.json')

export const moviesRouter = moviesRouter()

moviesRouter.get('/', (req, res) => {
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

moviesRouter.get('/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)

    // Si no se encuentra la película
    res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', (req, res) => {
    const result = validateMovie(req.body)

    // Toma valores de error o success
    if (result.error) {
        return res.status(400).json({
            error: JSON.parse(result.error.message)
        })
    }

    const newMovie = {
        id: randomUUID(), //uuidv4()
        ...result.data
    }

    movies.push(newMovie)

    // Código de estado de creación de recursos (201)
    res.status(201).json(newMovie)
})

moviesRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    const index = movies.findIndex(movie => movie.id === id)
    if (index === -1) return res.status(404).json({ message: 'Movie not found' })

    movies.splice(index, 1)
    res.status(204).send()
})

moviesRouter.patch('/:id', (req, res) => {
    const { id } = req.params
    const index = movies.findIndex(movie => movie.id === id)
    if (index === -1) return res.status(404).json({ message: 'Movie not found' })

    const result = validatePartialMovie(req.body)
    if (result.error) {
        return res.status(400).json({
            error: JSON.parse(result.error.message)
        })
    }

    movies[index] = {
        ...movies[index],
        ...result.data
    }

    res.json(movies[index])
})