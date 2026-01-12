document.addEventListener('DOMContentLoaded', () => {
    // Referencias exactas a tu HTML
    const letrasInput = document.getElementById('letrasCuenta');
    const doceDigitosInput = document.getElementById('doceDigitos');
    const sumaLetrasInput = document.getElementById('sumaLetras');
    const controlInput = document.getElementById('digitosControl');
    const cuentaFinalInput = document.getElementById('cuentaFinal');
    const contadorInput = document.getElementById('contadorErrores');
    const reinicioBtn = document.getElementById('btnReiniciarCookie');
    const formulario = document.getElementById('formProducto');

    // --- GESTIÓN DE COOKIES ---
    function setCookie(valor) {
        const d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 días
        // Importante: SameSite=Lax y Path=/ para que persista
        document.cookie = "intentosFallidos=" + valor + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
    }

    function getCookie() {
        let nombre = "intentosFallidos=";
        let lista = document.cookie.split(';');
        for (let i = 0; i < lista.length; i++) {
            let c = lista[i].trim();
            if (c.indexOf(nombre) == 0) return c.substring(nombre.length, c.length);
        }
        return "0";
    }

    // AL CARGAR: Cargar el valor de la cookie en el campo
    contadorInput.value = getCookie();

    // BOTÓN REINICIAR
    reinicioBtn.addEventListener('click', () => {
        setCookie("0");
        contadorInput.value = "0";
    });

    // --- CÁLCULOS DE CUENTA ---
    function actualizarCuentaFinal() {
        if (letrasInput.value.length === 2 && doceDigitosInput.value.length === 12) {
            cuentaFinalInput.value = letrasInput.value + sumaLetrasInput.value + doceDigitosInput.value + controlInput.value;
        } else {
            cuentaFinalInput.value = '';
        }
    }

    letrasInput.addEventListener('input', () => {
        let val = letrasInput.value.toUpperCase().replace(/[^A-Z]/g, '');
        letrasInput.value = val;
        if (val.length === 2) {
            const s1 = val.charCodeAt(0) - 64;
            const s2 = val.charCodeAt(1) - 64;
            sumaLetrasInput.value = (s1 + s2).toString().padStart(2, '0');
        } else { sumaLetrasInput.value = ''; }
        actualizarCuentaFinal();
    });

    doceDigitosInput.addEventListener('input', () => {
        let val = doceDigitosInput.value.replace(/\D/g, '');
        doceDigitosInput.value = val;
        if (val.length === 12) {
            const p1 = val.substring(0, 6).split('').reduce((a, b) => a + parseInt(b), 0);
            const p2 = val.substring(6, 12).split('').reduce((a, b) => a + parseInt(b), 0);
            const dc1 = Math.floor(p1 / 6).toString().padStart(2, '0');
            const dc2 = Math.floor(p2 / 6).toString().padStart(2, '0');
            controlInput.value = dc1 + dc2;
        } else { controlInput.value = ''; }
        actualizarCuentaFinal();
    });

    // --- VALIDACIÓN Y CONTADOR ---
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitamos recarga de página

        const fecha = document.getElementById('fechaCreacion').value;
        const cocinero = document.getElementById('cocinero').value;
        const destinatario = document.getElementById('destinatario').value;
        const compo = document.getElementById('composicion').value;

        // RegEx actualizadas
        const validadorFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const validadorCocinero = /^[A-Z]{2}.{1}\d{4}$/;
        const validadorDestinatario = /^[A-Z]{2,3}_[a-z]+:\d{4}$/;
        const validadorCompo = /^\d+g([a-zA-Z]{1,2}\d?){2}$/;

        let msg = "";
        // Validamos uno a uno para detectar errores
        if (!validadorFecha.test(fecha)) msg = "Fecha incorrecta (dd/mm/aaaa)";
        else if (!validadorCocinero.test(cocinero)) msg = "Cocinero incorrecto (EJ: WW$1234)";
        else if (!validadorDestinatario.test(destinatario)) msg = "Destinatario incorrecto (EJ: NM_albuquerque:1234)";
        else if (!validadorCompo.test(compo)) msg = "Composición incorrecta (EJ: 200gC3OH7)";
        else if (cuentaFinalInput.value.length < 10) msg = "Cuenta incompleta";

        if (msg !== "") {
            // SI HAY ERROR: Sumar siempre
            let fallos = parseInt(getCookie());
            fallos++;
            setCookie(fallos);
            contadorInput.value = fallos;
            alert(msg);
        } else {
            alert("¡Producto azul guardado!");
        }
    });
});