const z = require("zod")

const movieSchema = z.object({
    title: z.string(
        {
            invalid_type_error: "Movie title must be a string",
            required_error: "Movie title is required"
        }
    ),
    director: z.string(),
    year: z.number().int().min(1900).max(2024),
    duration: z.number().int().positive(),
    rate: z.number().int().min(0).max(10).optional(),
    poster: z.string().url({
        message: "Poster must be a valid URL"
    }),
    genre: z.array(
        z.enum(["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Thriller", "Sci-Fi"]),
        {
            required_error: "Movie genre is required",
            invalid_type_error: "Movie genre must be an array of enum Genre"
        }
    )
})

function validateMovie(object) {
    return movieSchema.safeParse(object)
    // Devuelve un objeto result con dos propiedades: data y error
}

module.exports = {
    validateMovie
}