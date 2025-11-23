function write(mensaje) {
    const outputDiv = document.getElementById('cosas');
    const nuevaLinea = document.createElement('div');
    nuevaLinea.className = 'log-entry';
    nuevaLinea.innerHTML = "> " + mensaje;
    outputDiv.appendChild(nuevaLinea);
}

// 2. Definición de la Clase (La forma moderna de hacer tu 'constructor')
class Disco {
    constructor(disco = "", grupo = "", anio = "", tipo = "", localizacion = "") {
        this.disco = disco;
        this.grupo = grupo;
        this.anio = anio;
        this.tipo = tipo;
        this.localizacion = localizacion;
        this.prestado = false;
    }

    cambioDeLocalizacion() {
        let nuevaLoc = prompt(`Introduce la nueva localización para el disco "${this.disco}":`, "Estantería B");

        if (nuevaLoc) {
            this.localizacion = nuevaLoc;
            write(`Se ha cambiado la localización de <strong>${this.disco}</strong> a la posición <strong>${this.localizacion}</strong>.`);
        } else {
            write(`Cancelado cambio de localización para <strong>${this.disco}</strong>.`);
        }
    }

    cambioPrestado() {
        this.prestado = !this.prestado;
        const estado = this.prestado ? "PRESTADO" : "DISPONIBLE";
        write(`Se ha cambiado el estado de <strong>${this.disco}</strong> a <strong>${estado}</strong>.`);
    }

    mostrarDisco() {
        const estado = this.prestado ? "Prestado" : "Disponible";
        write(`INFO: El disco <strong>${this.disco}</strong> es de <strong>${this.grupo}</strong>, año <strong>${this.anio}</strong>. (Ubicación: ${this.localizacion}) [${estado}]`);
    }
}

// 3. Ejecución del código
function ejecutarLogica() {
    // Limpiar pantalla
    document.getElementById('cosas').innerHTML = "";

    write("Iniciando sistema...");

    var disco1 = new Disco("Nevermind", "Nirvana", 1991, "rock", 5);

    disco1.mostrarDisco();

    setTimeout(() => {
        disco1.cambioDeLocalizacion();
        disco1.cambioPrestado();
        disco1.mostrarDisco();
    }, 500);
}

function reiniciarDemo() {
    ejecutarLogica();
}
window.onload = ejecutarLogica;