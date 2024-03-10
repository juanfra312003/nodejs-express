const fs = require('node:fs/promises')
const path = require('node:path')

// Posicion 0 node, posicion 1 el fichero
const folder = process.argv[2] ?? '.'

async function ls (directory){
    let files
    try{
        // Asincronica secuencial
        files = await fs.readdir(folder)
    }
    catch (error){
        console.error('Error al leer el directorio: ', folder)
        process.exit(1)
    }

    // Asincronia paralela con map
    const filePromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let stats
        try{
            // Obtener la información del archivo
            stats = await fs.stat(filePath)
        }
        catch(error){
            console.error('Error al leer el fichero: ', filePath)
            process.exit(1)
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f'
        const fileSize = stats.size
        const fileModified = stats.mtime.toLocaleString()

        return `${fileType} ${file.padEnd(20)} ${fileSize.toString().padStart(10)} ${fileModified}`
    })

    // Asincronia paralela
    const filesInfo = await Promise.all(filePromises)
    
    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)