/*
Descripcion: Actividad 1 Ej5
Desarrollodor; Luis Fernando Aponte Barbery
Fecha; Formato gringo 2024.04.21
Cambios; Ninguno
*/
// Función para generar nombres aleatorios
function generarNombres(cantidad) {
    let nombres = ["Juan", "María", "Pedro", "Ana", "Luis", "Sofía", "Diego", "Laura", "Carlos", "Lucía"];
    let resultados = [];

    for (let i = 0; i < cantidad; i++) {
        let nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
        resultados.push(nombreAleatorio);
    }

    return resultados;
}

// Función para generar apellidos aleatorios
function generarApellidos(cantidad) {
    let apellidos = ["GonzáLez", "RoDríguez", "LópEz", "MArtínez", "PéRez", "GómEz", "sánchez", "DíaZ", "FErnández", "moreno"];
    let resultados = [];

    for (let i = 0; i < cantidad; i++) {
        let apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
        resultados.push(apellidoAleatorio);
    }

    return resultados;
}

// Función para formatear un nombre completo
function formatearNombreCompleto(nombreCompleto) {
    let partes = nombreCompleto.split(" ");
    let nombreFormateado = partes[0].charAt(0).toUpperCase() + partes[0].slice(1).toLowerCase();
    let apellidoFormateado = partes[1].charAt(0).toUpperCase() + partes[1].slice(1).toLowerCase();
    return nombreFormateado + " " + apellidoFormateado;
}

// Generar nombres aleatorios
let nombresAleatorios = generarNombres(15);

// Generar apellidos aleatorios
let apellidosAleatorios = generarApellidos(15);

// Combinar nombres y apellidos en un array de nombres completos
let nombresCompletos = [];
for (let i = 0; i < nombresAleatorios.length; i++) {
    let nombreCompleto = nombresAleatorios[i] + " " + apellidosAleatorios[i];
    nombresCompletos.push(formatearNombreCompleto(nombreCompleto));
}

console.log("Nombres Completos:");
console.log(nombresCompletos);
