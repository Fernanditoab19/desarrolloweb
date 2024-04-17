
/*const INTERVALO=10;

console.log("Intervalo sera de " + INTERVALO + "minutos");

var Intervalo=15;
console.log("Intervalo sera de " + Intervalo + "minutos con una variable");
Intervalo=20;
console.log("Intervalo sera de " + Intervalo + "minutos con una variable MODIFICADA");

//Converciones Implicitas
//Realizar las siguientes converciones implicitas y explicitas
let var1 = 15.25;
let var2 = 0;
let var3 = true;
let var4 = "100";


console.log("Converciones Implicitas")

// Conversión implícita al asignar var1 a varx
varx = var1;
console.log("Para la variable varx = " + varx + " con el tipo de dato = " + typeof varx);

// Conversión implícita al asignar var2 a varx
varx = var2;
console.log("Para la variable varx = " + varx + " con el tipo de dato = " + typeof varx);

// Conversión implícita al asignar var3 a varx
varx = var3;
console.log("Para la variable varx = " + varx + " con el tipo de dato = " + typeof varx);

// Conversión explícita al asignar var4 a varx
varx = var4;
console.log("Para la variable varx = " + varx + " con el tipo de dato = " + typeof varx);

//Converciones Explicitas
console.log("Converciones Explicitas")

varx = var1 + var2 // Convercion explicita entre int e int
console.log("Para la variable varx = " + varx + " con el tipo de dato = " + typeof varx);

let vary;
vary = Boolean(var2) + var3; // Convercion explicita entre int y boolean
console.log("Para la variable vary = " + vary + " con el tipo de dato = " + typeof vary);

varx = var1 + parseInt(var4); // Convercion explicita entre int y un string convertido a entero
console.log("Para la variable varx = " + varx + " con el tipo de dato = " + typeof varx);


let carrito=["leche",1,
            "carne",2,
            "papa",3,
            "fideos",1];
            
console.log("item:"+carrito[0]);
console.log("cantidad:"+carrito[1]);
console.log("item:"+carrito[2]);
console.log("cantidad:"+carrito[3]);
console.log("item:"+carrito[4]);
console.log("cantidad:"+carrito[5]);
console.log("item:"+carrito[6]);
console.log("cantidad:"+carrito[7]);

console.log("IMPRESION COMPLETA");
console.log(carrito);
carrito.push("arroz",5)
console.log(carrito);
*/
/*
let item = {nombre:'Leche', cantidad:1};
console.log("Item: " +item.nombre);
console.log("Cantidad: "+item.nombre);

let carrito=[
{nombre:'Leche',cantidad:1},
{nombre:'carne',cantidad:2},
{nombre:'fideo',cantidad:3},
{nombre:'papa',cantidad:2},]
console.log(carrito);
/*
/*
// Imprimir el carrito con etiquetas
console.log("Carrito de compras:");
carrito.forEach(item => {
    console.log("Nombre: " + item.nombre);
    console.log("Cantidad: " + item.cantidad);
    console.log("-----------------------------");
});

// Agregar un nuevo registro al carrito
console.log("-------------------");
carrito.push({nombre: 'Papaya', cantidad: 7});
console.log("-------------------");
// Imprimir el carrito actualizado
console.log("Carrito actualizado:");
carrito.forEach(item => {
    console.log("Nombre: " + item.nombre);
    console.log("Cantidad: " + item.cantidad);
    console.log("precio: " + item.nombre);
    console.log("Cantidad: " + item.cantidad);
    console.log("-----------------------------");
});
*/
// Adicionar un nuevo registro.

let item = {nombre:'Leche',cantidad:2,precio:7.5};

//imprimir item, cantidad, precio, total. 
console. log("item: "+item.nombre); console. log ("cantidad: "+item. cantidad);
Console. log ("Precio: "+item.precio+"Bs"); 
console. log("total: "+item.cantidad*item. precio+"Bs");

let carrito=[{nombre: 'Leche', cantidad: 1, precio:7.5},
               {nombre:'carne', cantidad: 2, precio:30.5},
              {nombre:'fideo',cantidad:1,precio:5.0}];
item={nombre: 'arroz', cantidad:2, precio: 30.5};
carrito.push(item);