const http = require('node:http')

const desiredPort = process.env.PORT ?? 1234

const server = http.createServer((req, res) => {
    console.log('Peticion recibida', req.url)
    res.end('Hola mundo')
})

server.listen(desiredPort, () => {
    console.log(`Servidor escuchando en http://localhost:${desiredPort}`)
})
