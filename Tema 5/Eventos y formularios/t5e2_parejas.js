const contenedor = document.getElementById('juego');
const contadorText = document.getElementById('resultado');
const btnReiniciar = document.getElementById('reiniciar');

const personajes = [
    'apu.jpg', 'apu.jpg', 
    'ayudante.webp', 'ayudante.webp', 
    'homer.webp', 'homer.webp', 
    'lisa.png', 'lisa.png', 
    'mangula.png', 'mangula.png', 
    'milhouse.png', 'milhouse.png'
];

let cartasAbiertas = [];
let aciertos = 0;

function iniciarJuego() {
    contenedor.innerHTML = '';
    aciertos = 0;
    contadorText.textContent = aciertos;
    cartasAbiertas = [];

    // Mezclamos las cartas
    personajes.sort(() => Math.random() - 0.5);
    // Creacion de la tabla de cartas
    personajes.forEach(p => {
        const celda = document.createElement('div');
        celda.className = 'btn btn-primary m-1 d-flex align-items-center justify-content-center';
        celda.style.width = '120px';
        celda.style.height = '120px';
        celda.style.cursor = 'pointer';
        // Guardamos el personaje asociado a la carta en el bucle
        celda.dataset.personaje = p;
        
        celda.onclick = revelar;
        contenedor.appendChild(celda);
    });
}

function revelar() {
    // Revelación de cada carta con un límite de dos cartas abiertas y sin poder volver a clicar la misma carta
    if (cartasAbiertas.length < 2 && !this.classList.contains('revelada')) {
        this.style.backgroundImage = `url('imagenes_t5e2/${this.dataset.personaje}')`;
        this.style.backgroundSize = 'cover';
        this.classList.add('revelada');
        cartasAbiertas.push(this);

        if (cartasAbiertas.length === 2) {
            setTimeout(comprobar, 800);
        }
    }
}

function comprobar() {
    // Comprobación de si las dos cartas abiertas son iguales
    const [c1, c2] = cartasAbiertas;

    if (c1.dataset.personaje === c2.dataset.personaje) {
        c1.className = 'btn btn-success m-1';
        c2.className = 'btn btn-success m-1';
        aciertos++;
        contadorText.textContent = aciertos;
    } else {
        c1.style.backgroundImage = '';
        c2.style.backgroundImage = '';
        c1.classList.remove('revelada');
        c2.classList.remove('revelada');
    }
    cartasAbiertas = [];
}

btnReiniciar.onclick = iniciarJuego;
iniciarJuego();