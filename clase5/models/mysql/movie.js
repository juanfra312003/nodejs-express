// Conectar a mongo DB (Dos archivos con el mismo contrato)
import { readJSON } from "../../utils.js"
import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'mypass',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)


const movies = readJSON('./movies.json')

export class MovieModel {
    static getAll = async ({ genre }) => {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()

            // Tomar los ids de la BBDD usando los nombres de los géneros
            const [genreIds] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
            )

            // no genre found
            if (genreIds.length === 0) return []

            // Tomar el id del primer resultado.
            const [{ id }] = genreIds

            // Tomar las películas que tengan el id del género
            const [movies] = await connection.query(
                'SELECT tittle, year, director, duration, poster, rate, BIN_TO_UUID(id) FROM movie JOIN movie_genres ON movie.id = movie_genres.movie_id WHERE movie_genres.genre_id = ?;', [id]
            )

            console.log(movies)
        }


        const [movies] = await connection.query(
            'SELECT tittle, year, director, duration, poster, rate, BIN_TO_UUID(id) FROM MOVIE;'
        )
        console.log(movies)
    }

    static async getById({ id }) {

    }

    static async create({ input }) {

    }

    static async delete({ id }) {

    }

    static async update({ id, input }) {

    }
}