// Informacion y control de procesos en el entorno de Node.js
// Argumentos de entrada a la hora de ejecutar el proceso
console.log(process.argv)

// Controlar el proceso y su salida
// process.exit(1)

// Podemos controlar eventos del proceso
process.on('exit', () => {
    // Limpiar los recursos
})

// Current working directory
console.log(process.cwd())

// Platform information
console.log(process.env.OS) // <- Variable de entorno