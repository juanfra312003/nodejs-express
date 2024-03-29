// Conectar a mongo DB (Dos archivos con el mismo contrato)
import { readJSON } from "../../utils.js"
import mysql from 'mysql2'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'mypass',
    database: 'moviesdb'
}

const connection = mysql.createConnection(config)


const movies = readJSON('./movies.json')

export class MovieModel {
    static getAll = async ({ genre }) => {

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