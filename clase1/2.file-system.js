const fs = require('node:fs') // A partir de Node 16, se requiere poner el prefijo node

const stats = fs.statSync('./archivo.txt')
console.log(
    stats.isFile(), // si es un fichero
    stats.isDirectory(), // si es un directorio
    stats.isSymbolicLink(), // si es un enlace simbólico
    stats.size // tamaño del archivo
)