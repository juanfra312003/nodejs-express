// Conectar a mongo DB (Dos archivos con el mismo contrato)
import { readJSON } from "../../utils.js"
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