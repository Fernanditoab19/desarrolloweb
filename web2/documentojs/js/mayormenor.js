let array = [
    { nombre: "Juan", nota: 0 },
    { nombre: "Pedro", nota: 0 },
    { nombre: "Maria", nota: 0 },
    { nombre: "Fernando", nota: 0 }
];

console.log("Array inicial:");
console.log(array);

for (let i = 0; i < array.length; i++) {
    array[i].nota = Math.floor(Math.random() * 81) + 20; // Número aleatorio entre 20 y 100
}

console.log("Array con Notas Aleatorias en el Rango de 20 a 100:");
console.log(array);

//Encontrar Promedio de las notas
let totalNotas = 0;

for (let i = 0; i < array.length; i++) {
    totalNotas += array[i].nota;
}

let promedio = totalNotas / array.length;

console.log("Promedio de Notas:", promedio);