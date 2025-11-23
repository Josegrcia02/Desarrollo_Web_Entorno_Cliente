        class Disco {
            constructor(nombre = "", grupo = "", anio = "", tipo = "", localizacion = "") {
                this.nombre = nombre; // Cambiado 'disco' a 'nombre' para claridad
                this.grupo = grupo;
                this.anio = anio;
                this.tipo = tipo;
                this.localizacion = localizacion;
            }

            // Método para mostrar información formateada
            toString() {
                return `<div class="ml-4 text-sm text-gray-600">
                    <strong>${this.nombre}</strong> - ${this.grupo} 
                    <span class="text-xs bg-gray-200 px-2 py-0.5 rounded-full ml-2">${this.anio}</span>
                    <br>
                    <span class="text-xs text-gray-400">Género: ${this.tipo} | Loc: ${this.localizacion}</span>
                </div>`;
            }
        }

        // --- 2. ARRAY VACÍO ---
        let discos = [];

        // --- 3. FUNCIÓN WRITE (Para escribir en el HTML) ---
        function write(titulo, contenido, tipo = "info") {
            const contenedor = document.getElementById("resultado-js");
            
            // Limpiar mensaje de bienvenida si es la primera vez
            if(contenedor.querySelector('.text-center')) {
                contenedor.innerHTML = '';
            }

            let claseColor = "log-info";
            if (tipo === "success") claseColor = "log-success";
            if (tipo === "error") claseColor = "log-error";
            if (tipo === "warning") claseColor = "log-warning";

            const nuevoElemento = document.createElement('div');
            nuevoElemento.className = `log-entry ${claseColor} p-4 rounded-md shadow-sm`;
            nuevoElemento.innerHTML = `
                <div class="font-bold text-gray-800 mb-1 text-xs uppercase tracking-wide opacity-70">${titulo}</div>
                <div class="text-gray-700">${contenido}</div>
            `;
            
            contenedor.appendChild(nuevoElemento);
            
            // Auto-scroll al final
            const scrollContainer = document.getElementById("log-container");
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }

        function limpiarLog() {
            document.getElementById("resultado-js").innerHTML = `
                <div class="text-center text-gray-400 mt-10 italic">
                    Log limpiado. Esperando operaciones...
                </div>`;
        }

        // --- 4. FUNCIONES DE LÓGICA (Adaptadas de arrays.js) ---

        // Mostrar número de discos
        function mostrarNumero() {
            write("Estado del Array", `Actualmente hay <strong>${discos.length}</strong> discos almacenados.`, "info");
        }

        // Mostrar listado de discos
        function mostrarListado() {
            if (discos.length === 0) {
                write("Listado", "El array está vacío.", "warning");
                return;
            }

            let opcion = prompt("¿Cómo quieres mostrar el listado?\n1. Orden original\n2. Del revés (Inverso)\n3. Ordenados alfabéticamente (Por nombre)");

            let listaHTML = "";
            let discosParaMostrar = [];

            if (opcion === "1") {
                discosParaMostrar = discos;
                write("Listado (Orden Original)", generarListaHTML(discosParaMostrar), "info");
            } else if (opcion === "2") {
                discosParaMostrar = [...discos].reverse();
                write("Listado (Inverso)", generarListaHTML(discosParaMostrar), "info");
            } else if (opcion === "3") {
                // Ordenar por nombre del disco
                discosParaMostrar = [...discos].sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));
                write("Listado (Alfabético)", generarListaHTML(discosParaMostrar), "info");
            } else if (opcion !== null) {
                alert("Opción no válida");
            }
        }

        function generarListaHTML(lista) {
            return lista.map((d, index) => `<div class="mb-2 border-b pb-2 last:border-0">${index + 1}. ${d.toString()}</div>`).join("");
        }

        // Mostrar un intervalo de discos
        function mostrarIntervalo() {
            if (discos.length === 0) {
                write("Intervalo", "No hay discos para mostrar intervalos.", "warning");
                return;
            }

            let intervalo = prompt(`Introduce el intervalo (inicio-fin).\nÍndices disponibles: 0 a ${discos.length - 1}.\nEjemplo: 0-2`);

            if (intervalo && intervalo.includes("-")) {
                let partes = intervalo.split("-");
                let inicio = parseInt(partes[0]);
                let fin = parseInt(partes[1]);

                if (!isNaN(inicio) && !isNaN(fin) && inicio >= 0 && fin < discos.length && inicio <= fin) {
                    let seleccion = discos.slice(inicio, fin + 1);
                    write(`Intervalo [${inicio} - ${fin}]`, generarListaHTML(seleccion), "info");
                } else {
                    write("Error Intervalo", "Los índices están fuera de rango o son incorrectos.", "error");
                    alert("Rango no válido.");
                }
            } else if (intervalo !== null) {
                alert("Formato incorrecto. Usa 'inicio-fin'.");
            }
        }

        // Añadir un disco
        function anadirDisco() {
            // Pedir datos primero
            let nombre = prompt("Introduce el NOMBRE del disco:");
            if (!nombre) return;

            let grupo = prompt("Introduce el GRUPO/ARTISTA:");
            let anio = prompt("Introduce el AÑO de publicación:");
            let tipo = prompt("Introduce el TIPO (Género):", "Rock");
            let loc = prompt("Introduce la LOCALIZACIÓN:", "Estantería 1");

            let nuevoDisco = new Disco(nombre, grupo, anio, tipo, loc);

            // Preguntar dónde insertar
            let opcion = prompt(`Has creado "${nombre}". ¿Dónde quieres añadirlo?\n1. Al principio\n2. Al final`);

            if (opcion === "1") {
                discos.unshift(nuevoDisco);
                write("Añadido al Principio", `Se añadió: <strong>${nombre}</strong>`, "success");
            } else if (opcion === "2") {
                discos.push(nuevoDisco);
                write("Añadido al Final", `Se añadió: <strong>${nombre}</strong>`, "success");
            } else if (opcion !== null) {
                alert("Opción no válida. No se añadió el disco.");
            }
        }

        // Borrar un disco
        function borrarDisco() {
            if (discos.length === 0) {
                write("Borrar", "No hay discos para borrar.", "warning");
                return;
            }

            let opcion = prompt("¿Qué deseas borrar?\n1. El primer disco (Principio)\n2. El último disco (Final)");

            if (opcion === "1") {
                let borrado = discos.shift();
                write("Borrado (Principio)", `Se eliminó el disco: <strong>${borrado.nombre}</strong>`, "error");
            } else if (opcion === "2") {
                let borrado = discos.pop();
                write("Borrado (Final)", `Se eliminó el disco: <strong>${borrado.nombre}</strong>`, "error");
            } else if (opcion !== null) {
                alert("Opción no válida");
            }
        }

        // Consultar un disco
        function consultarDisco() {
            if (discos.length === 0) {
                write("Consulta", "Array vacío.", "warning");
                return;
            }

            let opcion = prompt("Modo de consulta:\n1. Por posición\n2. Por nombre");

            if (opcion === "1") {
                let pos = parseInt(prompt(`Introduce posición (0 - ${discos.length - 1}):`));
                if (!isNaN(pos) && pos >= 0 && pos < discos.length) {
                    write(`Consulta Posición [${pos}]`, discos[pos].toString(), "info");
                } else {
                    write("Error Consulta", "Posición no válida.", "error");
                }
            } else if (opcion === "2") {
                let nombreBusqueda = prompt("Introduce el nombre exacto del disco a buscar:");
                if (nombreBusqueda) {
                    // Buscar índice
                    let index = discos.findIndex(d => d.nombre.toLowerCase() === nombreBusqueda.toLowerCase());
                    
                    if (index !== -1) {
                        write("Consulta por Nombre (Encontrado)", `El disco <strong>${discos[index].nombre}</strong> está en la posición <strong>${index}</strong>.<br>${discos[index].toString()}`, "success");
                    } else {
                        write("Consulta por Nombre", `No se encontró ningún disco llamado "${nombreBusqueda}".`, "warning");
                    }
                }
            } else if (opcion !== null) {
                alert("Opción no válida");
            }
        }

        // Cargar algunos datos de ejemplo al iniciar para no empezar vacíos (Opcional, pero útil)
        window.onload = function() {
            write("Sistema Iniciado", "Array de discos inicializado vacío. Usa los botones de la izquierda.", "info");
        };