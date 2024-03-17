const express = require('express')
const movies = require('./movies.json')


const app = express()

app.disable('x-powered-by') // Deshabilitar el header 'x-powered-by'

app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo' })
})

// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
    res.json(movies)
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})