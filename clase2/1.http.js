const http = require('node:http')
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 1234

// Procesamiento de la petición -> Mejor usarlo como función
const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (req.url === '/') {
        res.statusCode = 200
        res.end('<h1> Bienvenido a mi página de inicio. jojo </h1>')
    } else if (req.url === '/imagen-super-bonita.png') {
        // Se espera una imágen cómo respuesta
        fs.readFile('./imagen_jc.png', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1> 500: Error interno del servidor </h1>')
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'image/png')
                res.end(data)
            }
        })
    } else if (req.url === '/contacto') {
        res.statusCode = 200
        res.end('<h1> Página de contacto </h1>')
    } else {
        res.statusCode = 404
        res.end('<h1> 404: Página no encontrada </h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`Servidor escuchando en http://localhost:${desiredPort}`)
})
