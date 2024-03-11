const http = require('node:http')

const desiredPort = process.env.PORT ?? 1234

// Procesamiento de la petición
const processRequest = (req, res) => {
    if (req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<h1> Bienvenido a mi página de inicio. jojo </h1>')
    } else if (req.url === '/contacto') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<h1> Página de contacto </h1>')
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<h1> 404: Página no encontrada </h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`Servidor escuchando en http://localhost:${desiredPort}`)
})
