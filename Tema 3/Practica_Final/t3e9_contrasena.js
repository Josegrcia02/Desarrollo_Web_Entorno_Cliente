function ejecutarContrasena() {
    const resultadoDiv = document.getElementById("resultado-js");
    
    // Contenido HTML de la utilidad (reestructurado para el entorno)
    resultadoDiv.innerHTML = `
        <div class="p-4 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Comprobador de Contraseña Segura</h2>
            <p class="text-sm text-gray-600 mb-4">Introduce una contraseña para verificar si cumple con los requisitos de seguridad.</p>

            <!-- Input de Contraseña -->
            <div class="mb-4">
                <label for="contrasena" class="block text-md font-medium text-gray-800 mb-2">Contraseña propuesta:</label>
                <input type="password" id="contrasena" placeholder="Introduce tu contraseña aquí"
                       class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
            </div>

            <!-- Botón de Validación -->
            <button id="comprobar-btn"
                    class="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md">
                Comprobar Seguridad
            </button>

            <!-- Contenedor de Resultados -->
            <div id="resultado-contrasena" class="mt-6 p-3 rounded-lg hidden">
                <h3 id="estado-seguridad" class="text-xl font-bold mb-2"></h3>
                <p id="mensaje-estado" class="text-md mb-3"></p>
                
                <h4 class="font-bold text-gray-700 border-t pt-2">Requisitos de Seguridad:</h4>
                <ul class="list-disc list-inside space-y-1 mt-1 text-gray-700 text-sm">
                    <li>Entre 8 y 16 caracteres.</li>
                    <li>Al menos una letra mayúscula (A-Z).</li>
                    <li>Al menos una letra minúscula (a-z).</li>
                    <li>Al menos un número (0-9).</li>
                    <li>Al menos un carácter especial (- _ @ # $ % &).</li>
                </ul>
            </div>
        </div>
    `;

    // Estilos internos necesarios para la funcionalidad de seguridad
    // He ajustado los estilos Tailwind a clases más simples para integrarlos con tus estilos CSS existentes
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
        /* Definiciones de color para la utilidad */
        .text-secure { color: #10B981; } /* Verde Esmeralda */
        .text-insecure { color: #EF4444; } /* Rojo */
        .bg-secure-light { background-color: #D1FAE5; } /* Fondo Verde claro */
        .bg-insecure-light { background-color: #FEE2E2; } /* Fondo Rojo claro */
    `;
    resultadoDiv.appendChild(styleSheet);


    // Lógica de Validación (extraída del archivo original)
    const comprobarBtn = document.getElementById('comprobar-btn');
    comprobarBtn.addEventListener('click', validarContrasena);

    function validarContrasena() {
        const password = document.getElementById('contrasena').value;
        const resultadoContrasenaDiv = document.getElementById('resultado-contrasena');
        const estadoH3 = document.getElementById('estado-seguridad');
        const mensajeP = document.getElementById('mensaje-estado');

        // Requisito 1: Longitud entre 8 y 16
        const longitudOk = password.length >= 8 && password.length <= 16;
        
        // Requisito 2: Mayúscula
        const mayusculaOk = /[A-Z]/.test(password);
        
        // Requisito 3: Minúscula
        const minusculaOk = /[a-z]/.test(password);
        
        // Requisito 4: Número
        const numeroOk = /[0-9]/.test(password);
        
        // Requisito 5: Carácter especial (- _ @ # $ % &)
        const especialOk = /[-_@#%&$]/.test(password);

        // Comprobación de seguridad final
        const todosCumplidos = longitudOk && mayusculaOk && minusculaOk && numeroOk && especialOk;

        // Limpiar clases anteriores
        resultadoContrasenaDiv.classList.remove('bg-secure-light', 'bg-insecure-light', 'hidden');
        estadoH3.classList.remove('text-secure', 'text-insecure');

        // Generar la interfaz de resultados
        if (todosCumplidos) {
            estadoH3.textContent = 'Contraseña Segura';
            estadoH3.classList.add('text-secure');
            resultadoContrasenaDiv.classList.add('bg-secure-light');
            mensajeP.textContent = '¡Contraseña SEGURA! Cumple todos los requisitos.';
        } else {
            estadoH3.textContent = 'Contraseña No Segura';
            estadoH3.classList.add('text-insecure');
            resultadoContrasenaDiv.classList.add('bg-insecure-light');
            mensajeP.textContent = 'Contraseña NO segura. Revisa los criterios listados arriba.';
        }

        // Mostrar resultados
        resultadoContrasenaDiv.classList.remove('hidden');
    }
}