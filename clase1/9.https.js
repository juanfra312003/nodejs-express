const http = require('node:http')
const findAvailablePort = require('./10.free-port.js')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
    console.log('Peticion recibida')
    res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
    server.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`)
    })
})
