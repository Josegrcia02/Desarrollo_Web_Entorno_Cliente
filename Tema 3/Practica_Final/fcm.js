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