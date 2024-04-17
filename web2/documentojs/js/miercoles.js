let num = [3, 1, 5, 2, 4];
let newarray =[];
newarray = num;
newarray.sort();
console.log(newarray)

let carrito=[{nombre: 'Leche', cantidad: 1, precio:7.5},
               {nombre:'carne', cantidad: 2, precio:30.5},
              {nombre:'fideo',cantidad:4.,precio:5.0}];
item={nombre:"arroz",cantidad:30.6};
carrito.push(item);
/*
//ordenar el array de carrito
//ordenar un array lineal
let numeros=[4,5,7,9,3,1];
numeros.sort((a,b)=>a-b);
console.log(numeros);
console.log("impresion ordenador de precio");
carrito.sort((a,b)=>a.precio - b.precio);
console.log(carrito);

console.log("impresion por nombre");
carrito.sort((a,b)=>a.nombre.localeCompare (b.nombre));
console.log(carrito);
*/
console.log("impresion ordenador de precio");
let carrito0rdenadoporprecio = carrito.slice().sort((a,b) => a.precio - b.precio);
console.log(carrito0rdenadoporprecio);

console.log("impresion ordenador de nombre");
let carritoordenadorpornombre = carrito.slice().sort((a,b) => a.nombre.localeCompare (b.nombre));
console.log(carritoordenadorpornombre);
