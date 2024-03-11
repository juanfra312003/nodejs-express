const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()

app.disable('x-powered-by')

app.use((req, res, next) => {
    if (req.method !== 'POST') {
        return next()
    }
    if (req.headers['content-type'] !== 'application/json') {
        return next()
    }

    // Solo llegan request que son POST y que tienen el header 'content-type' con el valor 'application/json'
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        // Mutar la request y meter la info en el req.body -> No se responde
        req.body = data
        next()
    })
})

app.get('/pokemon/ditto', (req, res) => {
    res.json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
    // Se extrae el json que se obtuvo en el middleware
    res.status(201).json(req.body)
})

// Utilizar una forma global de manejar todas las request -> Debe ir al final
app.use((req, res) => {
    res.status(404).send('<h1> 404: Página no encontrada </h1>')
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
