// Conectar a mongo DB (Dos archivos con el mismo contrato)
import { readJSON } from "../../utils.js"
const movies = readJSON('./movies.json')

export class MovieModel {
    static getAll = async ({ genre }) => {
        if (genre) {
            const filteredMovies = movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
            return filteredMovies
        }
        return movies
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async create({ input }) {
        const newMovie = {
            id: randomUUID(),
            ...input
        }
        movies.push(newMovie)
        return newMovie
    }

    static async delete({ id }) {
        const index = movies.findIndex(movie => movie.id === id)
        if (index === -1) return false

        movies.splice(index, 1)
        return true
    }

    static async update({ id, input }) {
        const index = movies.findIndex(movie => movie.id === id)
        if (index === -1) return false

        movies[index] = { ...movies[index], ...input }
        return movies[index]
    }
}