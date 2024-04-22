/*
Descripcion: Actividad 1 Ej2
Desarrollodor; Luis Fernando Aponte Barbery
Fecha; Formato gringo 2024.04.21
Cambios; Ninguno
*/
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario
  
    // Obtener los valores del usuario y contraseña ingresados
    var usuario = document.getElementById("usuario").value.toLowerCase(); // Convertir a minúsculas
    var contrasena = document.getElementById("contrasena").value;
  
    // Validar el usuario y contraseña
    if ((usuario === "juan" || usuario === "pedro" || usuario === "maria" || usuario === "raul") && contrasena === "D153n0W3b2") {
      alert("Inicio de sesión exitoso. ¡Bienvenido/a, " + usuario + "!");
      // Aquí puedes redirigir a otra página si el inicio de sesión es exitoso
    } else {
      alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
      // Puedes agregar aquí más acciones si el inicio de sesión falla
    }
  });
  

  