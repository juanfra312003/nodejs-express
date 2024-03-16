const express = require('express')

const app = express()
app.disable('x-powered-by') // Deshabilitar el header 'x-powered-by'

app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})