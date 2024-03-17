const path = require('node:path')

// Unir rutas con path.join
// Las barras en unix y windows son diferentes

// Barra separadora de acuerdo con el SOP
console.log(path.sep)
const filepath = path.join('content', 'subfolder', 'test.txt')
console.log(filepath)

// Obtener el nombre del fichero
const base = path.basename(filepath)

// Obtener la extension
const extension = path.extname(filepath)
console.log(extension)

// Obtener el nombre del fichero sin la extension una vez identificada
const filename = path.basename(filepath, extension)
console.log(filename)