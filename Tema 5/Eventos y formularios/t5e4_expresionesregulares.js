document.addEventListener('DOMContentLoaded', () => {
    // Validador automático de la cuenta bancaria
    const letrasInput = document.getElementById('letrasCuenta');
    const doceDigitosInput = document.getElementById('doceDigitos');
    const sumaLetrasInput = document.getElementById('sumaLetras');
    const controlInput = document.getElementById('digitosControl');
    const cuentaFinalInput = document.getElementById('cuentaFinal');

    // Calcular suma de letras (A=1, B=2...)
    letrasInput.addEventListener('input', () => {
        let val = letrasInput.value.toUpperCase().replace(/[^A-Z]/g, '');
        letrasInput.value = val;

        if (val.length === 2) {
            const s1 = val.charCodeAt(0) - 64;
            const s2 = val.charCodeAt(1) - 64;
            const suma = (s1 + s2).toString().padStart(2, '0');
            sumaLetrasInput.value = suma;
        } else {
            sumaLetrasInput.value = '';
        }
        actualizarCuentaFinal();
    });

    // Calcular dígitos de control (división entre 6)
    doceDigitosInput.addEventListener('input', () => {
        let val = doceDigitosInput.value.replace(/\D/g, '');
        doceDigitosInput.value = val;

        if (val.length === 12) {
            const p1 = val.substring(0, 6).split('').reduce((a, b) => a + parseInt(b), 0);
            const p2 = val.substring(6, 12).split('').reduce((a, b) => a + parseInt(b), 0);
            
            const dc1 = Math.floor(p1 / 6).toString().padStart(2, '0');
            const dc2 = Math.floor(p2 / 6).toString().padStart(2, '0');
            
            controlInput.value = dc1 + dc2;
        } else {
            controlInput.value = '';
        }
        actualizarCuentaFinal();
    });

    function actualizarCuentaFinal() {
        if (letrasInput.value.length === 2 && doceDigitosInput.value.length === 12) {
            cuentaFinalInput.value = letrasInput.value + sumaLetrasInput.value + doceDigitosInput.value + controlInput.value;
        } else {
            cuentaFinalInput.value = '';
        }
    }

    // --- VALIDACIÓN GENERAL AL ENVIAR ---

    document.getElementById('formProducto').addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Fecha dd/mm/aaaa
        const fecha = document.getElementById('fechaCreacion').value;
        const validadorFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        // 2. Cocinero
        const cocinero = document.getElementById('cocinero').value;
        const validadorCocinero = /^[A-Z]{2}[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]\d{4}$/;

        // 3. Destinatario
        const destinatario = document.getElementById('destinatario').value;
        const validadorDestinatario = /^[A-Z]{2,3}_[a-z]+:\d{4}$/;

        // 4. Composición
        const compo = document.getElementById('composicion').value;
        const validadorCompo = /^\d+g([a-zA-Z]{1,2}\d?){2}$/;

        // Validaciones
        if (!validadorFecha.test(fecha)) return alert("Fecha inválida (dd/mm/aaaa)");
        if (!validadorCocinero.test(cocinero)) return alert("Cocinero inválido (EJ: WW$1234)");
        if (!validadorDestinatario.test(destinatario)) return alert("Destinatario inválido (EJ: NM_alburquerque:1234)");
        if (!validadorCompo.test(compo)) return alert("Composición inválida (EJ: 200gC3OH7)");
        if (cuentaFinalInput.value === "") return alert("La cuenta bancaria está incompleta");

        alert("¡Producto azul registrado con éxito!");
    });
});