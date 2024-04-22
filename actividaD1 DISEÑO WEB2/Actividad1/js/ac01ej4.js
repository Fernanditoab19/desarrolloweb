/*
Descripcion: Actividad 1 Ej4
Desarrollodor; Luis Fernando Aponte Barbery
Fecha; Formato gringo 2024.04.21
Cambios; Ninguno
*/
const readline = require('readline');

// Función para contar la cantidad de veces que aparece la letra "o" en una frase
function contarLetraO(frase) {
    let count = 0;
    for (let i = 0; i < frase.length; i++) {
        if (frase.charAt(i).toLowerCase() === 'o') {
            count++;
        }
    }
    return count;
}

// Función para verificar si un carácter es una vocal
function esVocal(caracter) {
    return 'aeiou'.includes(caracter.toLowerCase());
}

// Función para contar la cantidad de veces que aparece cada vocal en una frase
function contarVocales(frase) {
    const contadorVocales = {};
    for (let i = 0; i < frase.length; i++) {
        const caracter = frase.charAt(i).toLowerCase();
        if (esVocal(caracter)) {
            if (contadorVocales[caracter]) {
                contadorVocales[caracter]++;
            } else {
                contadorVocales[caracter] = 1;
            }
        }
    }
    return contadorVocales;
}

// Crear una interfaz de lectura para recibir la entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Solicitar al usuario ingresar una frase
rl.question('Por favor, ingresa una frase: ', (frase) => {
    // Contar la cantidad de veces que aparece la letra "o" en la frase
    const cantidadLetraO = contarLetraO(frase);

    // Contar la cantidad de veces que aparecen las vocales en total y cada una por separado
    const contadorVocales = contarVocales(frase);

    // Mostrar los resultados
    console.log(`Cuantas veces aparece la letra 'o': ${cantidadLetraO}`);
    console.log("Las vocales que aparecen:");
    for (const vocal in contadorVocales) {
        console.log(`${vocal}: ${contadorVocales[vocal]}`);
    }

    // Cerrar la interfaz de lectura
    rl.close();
});
