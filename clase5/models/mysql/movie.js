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

            return movies
        }


        const [movies] = await connection.query(
            'SELECT tittle, year, director, duration, poster, rate, BIN_TO_UUID(id) FROM MOVIE;'
        )
        return movies
    }

    static async getById({ id }) {
        const [movies] = await connection.query(
            `SELECT tittle, year, director, duration, poster, rate, BIN_TO_UUID(id) id
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        )

        if (movies.length === 0) return null

        return movies[0]
    }

    static async create({ input }) {
        const {
            title,
            year,
            director,
            duration,
            poster,
            rate,
            genre
        } = input;

        const [uuidResult] = await connection.query('SELECT UUID() uuid;');
        const [{ uuid }] = uuidResult;

        try {
            await connection.query(
                'INSERT INTO movie (id, tittle, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
                [uuid, title, year, director, duration, poster, rate]
            );

            // Insertar los géneros si no existen
            await Promise.all(genre.map(async genre => {
                const [genreResult] = await connection.query('SELECT id FROM genre WHERE name = ?;', [genre]);
                if (genreResult.length === 0) {
                    await connection.query('INSERT INTO genre (name) VALUES (?);', [genre]);
                }
            }));

            // Insertar las relaciones entre las películas y los géneros
            await Promise.all(genre.map(async genre => {
                const [genreResult] = await connection.query('SELECT id FROM genre WHERE name = ?;', [genre]);
                const [{ id }] = genreResult;
                await connection.query('INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);', [uuid, id]);
            }));

            return { id: uuid, ...input };
        } catch (error) {
            console.error('Error creating movie:', error);
            throw new Error('Error creating movie');
        }
    }


    static async delete({ id }) {

    }

    static async update({ id, input }) {

    }
}