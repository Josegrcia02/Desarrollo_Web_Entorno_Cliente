const formulario = document.getElementById('formulario');
let lista = [];

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const checkElement = document.getElementById('estado');

    const datos = new FormData(formulario);
    const valores = Object.fromEntries(datos.entries());
    
    if (checkElement.checked) { 
        valores.estado = "Prestado";
    } else {
        valores.estado = "No prestado";
    }

    lista.push(valores);
    console.log("Lista de discos actualizada:", lista);
    
    formulario.reset();
});