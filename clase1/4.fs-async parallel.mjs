import { readFile } from 'node:fs/promises'

// Ejecutar en paralelo, espera la respuesta.
Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
    console.log('Primer texto', text)
    console.log('Segundo texto', secondText)
})


// Verificacion de la ejecucion en paralelo
console.log("Acciones mientrsa tanto...")
console.log("Acciones mientrsa tanto...")
console.log("Acciones mientrsa tanto...")
console.log("Acciones mientrsa tanto...")

