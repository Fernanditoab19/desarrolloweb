/*
Descripcion: Actividad 1 Ej3
Desarrollodor; Luis Fernando Aponte Barbery
Fecha; Formato gringo 2024.04.21
Cambios; Ninguno
*/
// Función para verificar si un número es primo
function esPrimo(numero) {
    if (numero <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

// Función para generar un número primo aleatorio menor que 110
function generarPrimoAleatorio() {
    let primo = Math.floor(Math.random() * 110) + 1; // Generar un número aleatorio entre 1 y 110

    // Buscar el siguiente número primo si el número generado no es primo
    while (!esPrimo(primo)) {
        primo = Math.floor(Math.random() * 110) + 1;
    }

    return primo;
}

// Función para generar un array de N números primos menores que 110
function generarNumerosPrimos(N) {
    const numerosPrimos = [];
    let contador = 0;

    while (contador < N) {
        const primo = generarPrimoAleatorio();
        numerosPrimos.push(primo);
        contador++;
    }

    return numerosPrimos;
}

// Número de primos que deseas generar
const cantidadNumerosPrimos = 15; // Puedes cambiar este valor según tu necesidad

// Generar el array de números primos
const numerosPrimos = generarNumerosPrimos(cantidadNumerosPrimos);

// Imprimir los números primos generados
console.log("Números primos generados:");
console.log(numerosPrimos);
