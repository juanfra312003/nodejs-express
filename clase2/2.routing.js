const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    res.statusCode = 200
                    return res.end(JSON.stringify(dittoJSON))
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1> 404: Página no encontrada </h1>')
            }
        case 'POST':
            switch (url) {
                case '/pokemon': {
                    let body = ''
                    // Escuchar el evento de 'data' del request.
                    req.on('data', chunk => {
                        body += chunk.toString()
                    })
                    // Escuchar el evento de 'end' del request.
                    req.on('end', () => {
                        const data = JSON.parse(body)
                        // Llamar a una base de datos para guardar la info (Ejemplo)
                        res.statusCode = 201
                        res.setHeader('Content-Type', 'application/json; charset=utf-8')
                        data.timestamp = Date.now()
                        res.end(JSON.stringify(data))
                    })
                    break
                }

                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1> 404: Página no encontrada </h1>')
            }
    }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
    console.log('Servidor escuchando en http://localhost:1234')
})
