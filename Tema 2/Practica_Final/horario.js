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