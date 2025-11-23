// Variable global
var paises = ["España", "Francia", "Alemania", "Italia", "Portugal", "Grecia"];

// Función para escribir en el HTML con formato limpio
function write(titulo, texto) {
    const contenedor = document.getElementById("resultado-js");
    contenedor.innerHTML += `
        <div class="entrada-log">
            <span class="titulo-log">Opción: ${titulo}</span>
            ${texto}
        </div>`;
}

// 1. Mostrar número de elementos
function mostrarNumero(arr) {
    write("Mostrar número", `El array tiene <strong>${arr.length}</strong> elementos.`);
}

// 2. Mostrar listado (Original, Inverso, Alfabético)
function mostrarListado(arr) {
    let opcion = prompt("¿Cómo quieres mostrar el listado?\n1. Orden original\n2. Del revés\n3. Ordenados alfabéticamente");

    if (opcion === "1") {
        write("Listado Original", arr.join(", "));
    } else if (opcion === "2") {
        // Usamos [...arr] para crear una copia y no modificar el original
        let inverso = [...arr].reverse();
        write("Listado Inverso", inverso.join(", "));
    } else if (opcion === "3") {
        // Usamos [...arr] y sort() para ordenar alfabéticamente la copia
        let ordenado = [...arr].sort();
        write("Listado Alfabético", ordenado.join(", "));
    } else {
        alert("Opción no válida");
    }
}

// 3. Mostrar intervalo (inicio-fin)
function mostrarIntervalo(arr) {
    let intervalo = prompt("Introduce el intervalo (formato inicio-fin, ej: 1-3):");

    if (intervalo && intervalo.includes("-")) {
        let partes = intervalo.split("-");
        let inicio = parseInt(partes[0]);
        let fin = parseInt(partes[1]);

        if (!isNaN(inicio) && !isNaN(fin) && inicio >= 0 && fin < arr.length) {
            let elementos = arr.slice(inicio, fin + 1);
            write(`Intervalo [${inicio}-${fin}]`, elementos.join(", "));
        } else {
            alert("Valores incorrectos o fuera de rango.");
        }
    } else {
        alert("Formato incorrecto. Debes usar el guion (ej: 0-2).");
    }
}

// 4. Añadir país
function anadirPais(arr) {
    let pais = prompt("Introduce el nombre del país:");
    if (pais) {
        let opcion = prompt("¿Dónde añadir?\n1. Al principio\n2. Al final");

        if (opcion === "1") {
            arr.unshift(pais);
            write("Añadir al Principio", `Añadido: <strong>${pais}</strong>.<br>Array actual: ${arr.join(", ")}`);
        } else if (opcion === "2") {
            arr.push(pais);
            write("Añadir al Final", `Añadido: <strong>${pais}</strong>.<br>Array actual: ${arr.join(", ")}`);
        } else {
            alert("Opción no válida");
        }
    }
}

// 5. Borrar país
function borrarPais(arr) {
    if (arr.length === 0) {
        alert("No hay países para borrar.");
        return;
    }

    let opcion = prompt("¿Dónde borrar?\n1. Al principio\n2. Al final");

    if (opcion === "1") {
        let borrado = arr.shift();
        write("Borrar del Principio", `Se ha borrado: <strong>${borrado}</strong>.<br>Array actual: ${arr.join(", ")}`);
    } else if (opcion === "2") {
        let borrado = arr.pop();
        write("Borrar del Final", `Se ha borrado: <strong>${borrado}</strong>.<br>Array actual: ${arr.join(", ")}`);
    } else {
        alert("Opción no válida");
    }
}

// 6. Consultar país
function consultarPais(arr) {
    let opcion = prompt("¿Cómo quieres consultar?\n1. Por posición\n2. Por nombre");

    if (opcion === "1") {
        let pos = parseInt(prompt(`Introduce la posición (0 - ${arr.length - 1}):`));
        if (!isNaN(pos) && pos >= 0 && pos < arr.length) {
            write("Consulta por Posición", `En la posición ${pos} se encuentra: <strong>${arr[pos]}</strong>`);
        } else {
            write("Consulta por Posición", "Error: Posición no válida.");
        }
    } else if (opcion === "2") {
        let nombre = prompt("Introduce el nombre exacto:");
        let index = arr.indexOf(nombre);

        if (index !== -1) {
            write("Consulta por Nombre", `El país <strong>${nombre}</strong> está en la posición <strong>${index}</strong>.`);
        } else {
            write("Consulta por Nombre", `El país <strong>${nombre}</strong> no se encuentra en la lista.`);
        }
    } else {
        alert("Opción no válida");
    }
}

// Función MENU PRINCIPAL
function menu() {
    let opcion;
    do {
        opcion = prompt(
            "--- GESTIÓN DE PAÍSES ---\n" +
            "1. Mostrar número de países\n" +
            "2. Mostrar listado de países\n" +
            "3. Mostrar intervalo de países\n" +
            "4. Añadir un país\n" +
            "5. Borrar un país\n" +
            "6. Consultar un país\n" +
            "0. Salir"
        );

        // Pasamos 'paises' por parámetro como pide el ejercicio
        switch (opcion) {
            case "1": mostrarNumero(paises); break;
            case "2": mostrarListado(paises); break;
            case "3": mostrarIntervalo(paises); break;
            case "4": anadirPais(paises); break;
            case "5": borrarPais(paises); break;
            case "6": consultarPais(paises); break;
            case "0": break;
            case null: opcion = "0"; break; // Maneja el botón Cancelar
            default: alert("Opción no válida");
        }

    } while (opcion !== "0");
}
window.onload = function () {
    setTimeout(menu, 500);
};