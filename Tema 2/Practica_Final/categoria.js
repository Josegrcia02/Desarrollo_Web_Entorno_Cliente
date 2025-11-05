function ejecutarCategoria() {
    var anioNacimiento;
    var datosValidos = false;
    var resultadoDiv = document.getElementById("resultado-js");
    var anioActual = 2025;

    // Bucle para solicitar datos hasta que sean válidos
    while (!datosValidos) {
        anioNacimiento = prompt("Introduce tu año de nacimiento (ej: 2000):");

        // Convierte a número y verifica si es un año válido
        anioNacimiento = parseInt(anioNacimiento);

        if (isNaN(anioNacimiento) || anioNacimiento > anioActual || anioNacimiento < anioActual - 100) {
            alert("Error: Por favor, introduce un año de nacimiento válido.");
        } else {
            datosValidos = true;
        }
    }

    var edad = anioActual - anioNacimiento;
    var categoria;
    
    // Determinar categoría por edad
    if (edad <= 6) {
        categoria = "Micros";
    } else if (edad <= 8) {
        categoria = "Prebenjamín";
    } else if (edad <= 10) {
        categoria = "Benjamín";
    } else if (edad <= 12) {
        categoria = "Alevín";
    } else if (edad <= 14) {
        categoria = "Infantil";
    } else if (edad <= 16) {
        categoria = "Cadete";
    } else if (edad <= 18) {
        categoria = "Juvenil";
    } else {
        categoria = "Senior";
    }

    // Listado completo de categorías
    var listaCategorias = "<h3>Listado de Categorías (Referencia: Edad en el año actual)</h3><ul>";
    var categoriasPosibles = [
        { nombre: "Micros", edad: "0-6 años" },
        { nombre: "Prebenjamín", edad: "7-8 años" },
        { nombre: "Benjamín", edad: "9-10 años" },
        { nombre: "Alevín", edad: "11-12 años" },
        { nombre: "Infantil", edad: "13-14 años" },
        { nombre: "Cadete", edad: "15-16 años" },
        { nombre: "Juvenil", edad: "17-18 años" },
        { nombre: "Senior", edad: "19+ años" }
    ];

    for (var i = 0; i < categoriasPosibles.length; i++) {
        var linea = "<li>" + categoriasPosibles[i].nombre + " (" + categoriasPosibles[i].edad + ")</li>";
        // Marcar la categoría del usuario con negrita
        if (categoriasPosibles[i].nombre === categoria) {
            linea = "<li><strong>" + categoriasPosibles[i].nombre + " (" + categoriasPosibles[i].edad + ") (TU CATEGORÍA)</strong></li>";
        }
        listaCategorias += linea;
    }
    listaCategorias += "</ul>";

    // Mostrar resultado en pantalla
    resultadoDiv.innerHTML = "<h2>Calculadora de Categoría</h2>" +
                             "<p>Tu año de nacimiento: " + anioNacimiento + "</p>" +
                             "<p>Tu edad aproximada es: " + edad + " años</p>" +
                             "<p>Tu categoría es: <strong>" + categoria + "</strong></p>" +
                             listaCategorias;
}