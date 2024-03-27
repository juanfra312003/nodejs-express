import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        res.json(movies)
    }

    static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById(id)
        if (movie) return res.json(movie)

        // Si no se encuentra la película
        res.status(404).json({ message: 'Movie not found' })
    }

    static async create(req, res) {
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
    }

    static async delete(req, res) {
        const { id } = req.params
        const deleted = await MovieModel.delete({ id })
        if (deleted) return res.json({ message: 'Movie deleted' })

        res.status(404).json({ message: 'Movie not found' })
    }

    static async update(req, res) {
        const { id } = req.params
        const updatedMovie = await MovieModel.update({ id, input: req.body })
        return res.json(updatedMovie)
    }
}