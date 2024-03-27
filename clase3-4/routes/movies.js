// Rutas de películas
import { Router } from 'express'
import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js'
const movies = readJSON('./movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
})

moviesRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const movie = await MovieModel.getById(id)
    if (movie) return res.json(movie)

    // Si no se encuentra la película
    res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', async (req, res) => {
    const result = validateMovie(req.body)

    // Toma valores de error o success
    if (result.error) {
        return res.status(400).json({
            error: JSON.parse(result.error.message)
        })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    movies.push(newMovie)

    // Código de estado de creación de recursos (201)
    res.status(201).json(newMovie)
})

moviesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await MovieModel.delete({ id })

    if (result) return res.json({ message: 'Movie deleted' })

    res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.patch('/:id', async (req, res) => {
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: req.body })
    return res.json(updatedMovie)
})