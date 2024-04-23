$(document).ready(function(){
    var estudiantes = [];

    $("#registrar-btn").click(function(){
        var ci = parseInt($("#ci").val());
        var nombre = $("#nombre").val();
        var fecha = $("#fecha").val();
        var direccion = $("#direccion").val();
 
        // Validación básica de campos
        if(ci && nombre && fecha && direccion){
            // Crear objeto estudiante
            var estudiante = {
                ci: ci,
                nombre: nombre,
                fecha: fecha,
                direccion: direccion
            };

            // Agregar estudiante al array
            estudiantes.push(estudiante);

            // Limpiar campos del formulario
            $("#ci").val("");
            $("#nombre").val("");
            $("#fecha").val("");
            $("#direccion").val("");

            alert("Estudiante registrado exitosamente");
        } else {
            alert("Por favor, completa todos los campos");
        }
    });

    $("#listar-btn").click(function(){
        $("#lista-estudiantes").empty();
        if(estudiantes.length > 0){
            var table = "<table class='table table-striped'><thead><tr><th scope='col'>Cédula</th><th scope='col'>Nombre</th><th scope='col'>Fecha de Nacimiento</th><th scope='col'>Dirección</th></tr></thead><tbody>";
            for(var i = 0; i < estudiantes.length; i++){
                table += "<tr><td>" + estudiantes[i].ci + "</td><td>" + estudiantes[i].nombre + "</td><td>" + estudiantes[i].fecha + "</td><td>" + estudiantes[i].direccion + "</td></tr>";
            }
            table += "</tbody></table>";
            $("#lista-estudiantes").html(table);
        } else {
            $("#lista-estudiantes").append("<p>No hay estudiantes registrados</p>");
        }
    });
});