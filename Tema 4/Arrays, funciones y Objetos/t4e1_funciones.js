function ejecutarFCM() {
    var edad, sexo;
    var datosValidos = false;
    var resultadoDiv = document.getElementById("resultado-js");
    var fcm;

    // Bucle para solicitar datos hasta que sean válidos
    while (!datosValidos) {
        edad = prompt("Introduce tu edad:");
        sexo = prompt("Introduce tu sexo (H para hombre, M para mujer):").toUpperCase();

        // Convierte edad a número y verifica si es un número positivo
        edad = parseInt(edad);

        if (isNaN(edad) || edad <= 0 || (sexo !== "H" && sexo !== "M")) {
            alert("Error: Por favor, introduce una edad numérica positiva y un sexo válido (H o M).");
        } else {
            datosValidos = true;
        }
    }

    // Calcular FCM según el sexo
    if (sexo === "H") {
        fcm = 220 - edad;
    } else { // sexo === "M"
        fcm = 226 - edad;
    }

    // Calcular las zonas
    var zonas = [
        { nombre: "Zona de recuperación (60%-70%)", min: Math.round(fcm * 0.60), max: Math.round(fcm * 0.70) },
        { nombre: "Zona aeróbica (70%-80%)", min: Math.round(fcm * 0.70) + 1, max: Math.round(fcm * 0.80) },
        { nombre: "Zona anaeróbica (80%-90%)", min: Math.round(fcm * 0.80) + 1, max: Math.round(fcm * 0.90) },
        { nombre: "Línea roja (90%-100%)", min: Math.round(fcm * 0.90) + 1, max: fcm }
    ];

    var listaZonas = "<h3>Zonas de Entrenamiento</h3><ul>";
    for (var i = 0; i < zonas.length; i++) {
        listaZonas += "<li>" + zonas[i].nombre + ": " + zonas[i].min + " - " + zonas[i].max + " ppm</li>";
    }
    listaZonas += "</ul>";

    // Mostrar resultado en pantalla
    resultadoDiv.innerHTML = "<h2>Calculadora de FCM</h2>" +
        "<p>Tu edad: " + edad + " años</p>" +
        "<p>Tu sexo: " + (sexo === 'H' ? 'Hombre' : 'Mujer') + "</p>" +
        "<p>Tu Frecuencia Cardiaca Máxima (FCM) es: <strong>" + fcm + " ppm</strong></p>" +
        listaZonas;
}

function ejecutarHorario() {
    var resultadoDiv = document.getElementById("resultado-js");
    var htmlTablas = "<h2>Horario de la Asociación</h2>";

    // --- Horario de Mañana ---
    htmlTablas += "<h3>Horario de Mañana (Lunes a Viernes)</h3>";
    htmlTablas += "<table><thead><tr><th scope='col'>Hora</th>";
    var diasManana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    for (var d = 0; d < diasManana.length; d++) {
        htmlTablas += "<th scope='col'>" + diasManana[d] + "</th>";
    }
    htmlTablas += "</tr></thead><tbody>";

    // Horas de 9:00 a 15:00, de dos en dos
    for (var h = 9; h < 15; h += 2) {
        var horaInicio = h;
        var horaFin = h + 2;
        var horaFormato = horaInicio + ":00-" + horaFin + ":00";

        htmlTablas += "<tr><th scope='row'>" + horaFormato + "</th>"; // th para la primera columna 

        // Celdas de contenido
        for (var i = 0; i < diasManana.length; i++) {
            htmlTablas += "<td>Actividad " + horaInicio + "</td>"; // td para el resto 
        }
        htmlTablas += "</tr>";
    }
    htmlTablas += "</tbody></table>";


    // --- Horario de Tarde ---
    htmlTablas += "<h3>Horario de Tarde (Lunes a Domingo)</h3>";
    htmlTablas += "<table><thead><tr><th scope='col'>Hora</th>";
    var diasTarde = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    for (var d = 0; d < diasTarde.length; d++) {
        htmlTablas += "<th scope='col'>" + diasTarde[d] + "</th>";
    }
    htmlTablas += "</tr></thead><tbody>";

    // Horas de 16:00 a 21:00, de una en una
    for (var h = 16; h < 21; h++) {
        var horaInicio = h;
        var horaFin = h + 1;
        var horaFormato = horaInicio + ":00-" + horaFin + ":00";

        htmlTablas += "<tr><th scope='row'>" + horaFormato + "</th>";

        // Celdas de contenido (ejemplo de contenido)
        for (var i = 0; i < diasTarde.length; i++) {
            htmlTablas += "<td>Actividad " + horaInicio + "</td>";
        }
        htmlTablas += "</tr>";
    }
    htmlTablas += "</tbody></table>";

    // Mostrar tablas en pantalla
    resultadoDiv.innerHTML = htmlTablas;
}

function ejecutarIMC() {
    var altura, peso;
    var datosValidos = false;
    var resultadoDiv = document.getElementById("resultado-js");
    var imc;

    // Bucle para solicitar datos hasta que sean válidos
    while (!datosValidos) {
        altura = prompt("Introduce tu altura en centímetros (ej: 175)");
        peso = prompt("Introduce tu peso en kilogramos (ej: 70)");

        // Convierte a números y verifica si son números positivos
        altura = parseFloat(altura);
        peso = parseFloat(peso);

        if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
            alert("Error: Por favor, introduce valores numéricos positivos para la altura y el peso.");
        } else {
            datosValidos = true;
        }
    }

    // Convertir centímetros a metros
    var alturaMetros = altura / 100;

    // Calcular IMC 
    imc = peso / (alturaMetros * alturaMetros);
    imc = imc.toFixed(2); // Redondea a 2 decimales

    var clasificacion;
    var listaClasificaciones = "";

    // Determinar clasificación
    if (imc < 16.00) {
        clasificacion = "Infrapeso (delgadez severa)";
    } else if (imc < 17.00) {
        clasificacion = "Infrapeso (delgadez moderada)";
    } else if (imc < 18.50) {
        clasificacion = "Infrapeso (delgadez aceptable)";
    } else if (imc < 25.00) {
        clasificacion = "Peso normal";
    } else if (imc < 30.00) {
        clasificacion = "Sobrepeso";
    } else if (imc < 35.00) {
        clasificacion = "Obeso (Tipo I)";
    } else if (imc <= 40.00) {
        clasificacion = "Obeso (Tipo II)";
    } else {
        clasificacion = "Obeso (Tipo III)";
    }

    // Generar el listado de clasificaciones y marcar la del usuario [cite: 12]
    var categorias = [
        { rango: "< 16.00", nombre: "Infrapeso (delgadez severa)" },
        { rango: "16.00 - 16.99", nombre: "Infrapeso (delgadez moderada)" },
        { rango: "17.00 - 18.49", nombre: "Infrapeso (delgadez aceptable)" },
        { rango: "18.50 - 24.99", nombre: "Peso normal" },
        { rango: "25.00 - 29.99", nombre: "Sobrepeso" },
        { rango: "30.00 - 34.99", nombre: "Obeso (Tipo I)" },
        { rango: "35.00 - 40.00", nombre: "Obeso (Tipo II)" },
        { rango: "> 40.00", nombre: "Obeso (Tipo III)" }
    ];

    listaClasificaciones += "<h3>Escala de IMC</h3><ul>";
    for (var i = 0; i < categorias.length; i++) {
        var linea = "<li>" + categorias[i].rango + ": " + categorias[i].nombre + "</li>";
        // Marcar la clasificación del usuario con negrita
        if (categorias[i].nombre === clasificacion) {
            linea = "<li><strong>" + categorias[i].rango + ": " + categorias[i].nombre + " (TU CLASIFICACIÓN)</strong></li>";
        }
        listaClasificaciones += linea;
    }
    listaClasificaciones += "</ul>";

    // Mostrar resultado en pantalla 
    resultadoDiv.innerHTML = "<h2>Calculadora de IMC</h2>" +
        "<p>Tu altura: " + altura + " cm</p>" +
        "<p>Tu peso: " + peso + " kg</p>" +
        "<p>Tu Índice de Masa Corporal (IMC) es: <strong>" + imc + "</strong></p>" +
        "<p>Tu clasificación es: <strong>" + clasificacion + "</strong></p>" +
        listaClasificaciones;
}

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