// Función para generar un número aleatorio entre min y max (ambos inclusive)
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para obtener un nombre aleatorio del array de nombres
function obtenerNombreAleatorio() {
    return nombres[generarNumeroAleatorio(0, nombres.length - 1)];
}

// Función para obtener un apellido aleatorio del array de apellidos
function obtenerApellidoAleatorio() {
    return apellidos[generarNumeroAleatorio(0, apellidos.length - 1)];
}

// Función para generar un nombre completo aleatorio combinando un nombre y un apellido
function generarNombreCompleto() {
    let nombre = obtenerNombreAleatorio();
    let apellido = obtenerApellidoAleatorio();
    return nombre + ' ' + apellido; 
}

// Crear un array de nombres
let nombres = ['Juan', 'María', 'Pedro', 'Luis', 'Ana', 'Carlos', 'Laura','pedro', 'antonio', 'miguel', 'Luisito', 'carolina', 'Carla', 'Lauren'];

// Crear un array de apellidos
let apellidos = ['Gómez', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'pedraza', 'aponte', 'campos', 'paniagua', 'soliz', 'barbery', 'lobera', 'oblitas', 'sanchez'];

// Crear un array de nombres completos aleatorios
let nombresCompletos = [];
for (let i = 0; i < 20; i++) {
    nombresCompletos.push(generarNombreCompleto());
}

// Mostrar el array de nombres completos
console.log("Nombres completos generados:");
console.log(nombresCompletos);