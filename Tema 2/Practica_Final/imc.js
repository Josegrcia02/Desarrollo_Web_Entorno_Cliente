function ejecutarIMC() {
    var altura, peso;
    var datosValidos = false;
    var resultadoDiv = document.getElementById("resultado-js");
    var imc;

    // Bucle para solicitar datos hasta que sean válidos [cite: 21, 22]
    while (!datosValidos) {
        altura = prompt("Introduce tu altura en centímetros (ej: 175)");
        peso = prompt("Introduce tu peso en kilogramos (ej: 70)");

        // Convierte a números y verifica si son números positivos [cite: 21]
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

    // Calcular IMC [cite: 11]
    imc = peso / (alturaMetros * alturaMetros);
    imc = imc.toFixed(2); // Redondea a 2 decimales

    var clasificacion;
    var listaClasificaciones = "";

    // Determinar clasificación [cite: 12, 13, 14, 15, 16, 17, 18, 19, 20]
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

    // Mostrar resultado en pantalla [cite: 11]
    resultadoDiv.innerHTML = "<h2>Calculadora de IMC</h2>" +
                             "<p>Tu altura: " + altura + " cm</p>" +
                             "<p>Tu peso: " + peso + " kg</p>" +
                             "<p>Tu Índice de Masa Corporal (IMC) es: <strong>" + imc + "</strong></p>" +
                             "<p>Tu clasificación es: <strong>" + clasificacion + "</strong></p>" +
                             listaClasificaciones;
}   