// Función para generar un número aleatorio entre min y max (ambos inclusive)
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar un array de estudiantes con nombres aleatorios y notas aleatorias
function generarEstudiantes() {
    let estudiantes = [];
    for (let i = 0; i < 10; i++) {
        let nombre = (i === 0) ? "Juan" : "Estudiante" + i;
        let nota = generarNumeroAleatorio(2, 10); // Nota aleatoria entre 2 y 10
        estudiantes.push({ nombre: nombre, nota: nota });
    }
    return estudiantes;
}

// Función para calcular la nota mayor, menor y promedio
function calcularNotas(estudiantes) {
    let notas = estudiantes.map(estudiante => estudiante.nota);
    let notaMayor = Math.max(...notas);
    let notaMenor = Math.min(...notas);
    let suma = notas.reduce((total, nota) => total + nota, 0);
    let promedio = suma / notas.length;
    return { mayor: notaMayor, menor: notaMenor, promedio: promedio };
}

// Función para clasificar la nota de un estudiante
function clasificarNota(nota) {
    switch (nota) {
        case 0:
        case 1:
        case 2:
        case 3:
            return "Insuficiente";
        case 4:
        case 5:
        case 6:
            return "Suficiente";
        case 7:
        case 8:
            return "Bien";
        case 9:
            return "Notable";
        case 10:
            return "Sobresaliente";
        default:
            return "Nota fuera de rango";
    }
}

// Generar array de estudiantes
let estudiantes = generarEstudiantes();

// Calcular notas
let { mayor, menor, promedio } = calcularNotas(estudiantes);

// Mostrar resultados
console.log("Nota mayor:", mayor);
console.log("Nota menor:", menor);
console.log("Promedio:", promedio);

// Listar las notas y clasificarlas
console.log("Listado de notas:");
estudiantes.forEach(estudiante => {
    console.log(estudiante.nombre + ": " + estudiante.nota + " - " + clasificarNota(estudiante.nota));
});