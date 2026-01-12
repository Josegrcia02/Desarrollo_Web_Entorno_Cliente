const formulario = document.getElementById('formulario');
let lista = [];

window.onload = function() {
    const formulario = document.getElementById('formulario');

    // Asignamos la validación mediante AddEventListener al submit
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // Si la función de validación devuelve false, detenemos el envío
        if (!validaciones()) {
            return;
        }

        const checkElement = document.getElementById('estado');
        const datos = new FormData(formulario);
        const valores = Object.fromEntries(datos.entries());
        
        // Personalización del valor del checkbox
        valores.estado = checkElement.checked ? "Prestado" : "No prestado";

        lista.push(valores);
        console.log("Lista de discos actualizada:", lista);
        
        // Limpiamos el formulario y los estados de error
        formulario.reset();
        limpiarErrores();
    });
};

function campo20(idCampo) {
    const elemento = document.getElementById(idCampo);
    const etiqueta = document.querySelector(`label[for="${idCampo}"]`);
    
    if (elemento.value.trim().length > 20) {
        // Error: Borde rojo en el label
        elemento.classList.add('is-invalid');
        etiqueta.classList.add('label-error');
        return false;
    } else {
        // Correcto: Se quita el borde rojo
        elemento.classList.remove('is-invalid');
        etiqueta.classList.remove('label-error');
        return true;
    }
}

function validaciones(){
    // Aquí van las comprobaciones del formulario antes de enviarlo
    const tituloValido = campo20('titulo');
    const artistaValido = campo20('artista');


    const anioInput = document.getElementById('anio');
    const anioEtiqueta = document.querySelector('label[for="anio"]');
    const anioValidado = anioInput.value;
    
    let anioValido = true;
    if (anioValidado.toString().length !== 4 || anioValidado < 1900 || anioValidado > 2026) {
        anioInput.classList.add('is-invalid');
        anioEtiqueta.classList.add('label-error');
        anioValido = false;
    } else {
        anioInput.classList.remove('is-invalid');
        anioEtiqueta.classList.remove('label-error');
    }

    const locInput = document.getElementById('localizacion');
    const locEtiqueta = document.querySelector('label[for="localizacion"]');
    // Comprobación de que el campo está vacío o es numérico
    const locValida = locInput.value === "" || !isNaN(locInput.value);

    if (!locValida) {
        locInput.classList.add('is-invalid');
        locEtiqueta.classList.add('label-error');
    } else {
        locInput.classList.remove('is-invalid');
        locEtiqueta.classList.remove('label-error');
    }
    return tituloValido && artistaValido && anioValido && locValida;
}