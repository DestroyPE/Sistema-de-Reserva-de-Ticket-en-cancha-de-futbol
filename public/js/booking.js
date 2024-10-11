// Función para obtener los parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        fecha: params.get('fecha'),
        horarios: params.get('horarios'),
        total: params.get('total'),
        centroId: params.get('centroId'),
    };
}

// Mostrar la fecha y horarios seleccionados
document.addEventListener('DOMContentLoaded', function() {
    const { fecha, horarios, total, centroId } = getQueryParams();

    if (fecha && horarios) {
        // Cambia la coma por tres espacios en la cadena de horarios
        const hoursArray = horarios.split(','); // Divide la cadena en un array
        const formattedHours = hoursArray.join('&nbsp;&nbsp;&nbsp;'); // Une el array con tres espacios no divisibles

        document.getElementById('selected-hours').innerHTML = formattedHours; // Usa innerHTML para mostrar HTML
        document.getElementById('selected-date').textContent = fecha;

        // Actualizar el total si se recibe
        if (total) {
            document.querySelector('.total').textContent = `Total: ${total}`;
        }
    }

    // Lógica para el tipo de documento y validación del DNI
    const documentTypeSelect = document.getElementById('document-type');
    const documentNumberInput = document.getElementById('document-number');
    const spinner = document.getElementById('loading-spinner');
    const result = document.getElementById('dni-result');
    const proceedBtn = document.getElementById('proceed');  // Cambiado aquí

    // Escuchar cambios en el tipo de documento
    documentTypeSelect.addEventListener('change', function () {
        if (this.value === 'DNI') {
            documentNumberInput.maxLength = 8;  // Limitar a 8 caracteres
            documentNumberInput.pattern = '[0-9]{8}';  // Permitir solo números
            documentNumberInput.placeholder = "Ingrese su DNI (8 números)";
        } else {
            documentNumberInput.removeAttribute('maxLength');
            documentNumberInput.removeAttribute('pattern');
            documentNumberInput.placeholder = "Ingrese su número de documento";
        }
    });

    // Validar que solo se ingresen números en caso de DNI
    documentNumberInput.addEventListener('input', function () {
        if (documentTypeSelect.value === 'DNI') {
            this.value = this.value.replace(/\D/g, '');  // Eliminar cualquier carácter que no sea un número
        }
    });

    // Función para simular la búsqueda del DNI
    function searchDni(dni) {
        spinner.style.display = 'block';  // Mostrar el spinner
        result.textContent = '';  // Limpiar el resultado previo

        setTimeout(() => {
            spinner.style.display = 'none';  // Ocultar el spinner después de 3 segundos

            // Simular la respuesta de la búsqueda del DNI
            if (dni === '75682456') {
                result.textContent = 'Angles Payano, Neil';
            } else if (dni === '75154371') {
                result.textContent = 'Hinostroza Turin, Cesar';
            } else {
                result.textContent = 'DNI no existe';
            }
        }, 3000);  // Esperar 3 segundos
    }

    // Escuchar cuando se termine de ingresar el DNI
    documentNumberInput.addEventListener('blur', function () {
        const dni = documentNumberInput.value;
        if (dni.length === 8 && documentTypeSelect.value === 'DNI') {
            searchDni(dni);
        }
    });

    // Enviar datos al hacer clic en "Proceder al Pago"
    proceedBtn.addEventListener('click', function() {
        const nombre = document.getElementById('dni-result').textContent;
        const dni = documentNumberInput.value;
        const tipoDocumento = documentTypeSelect.value;

        // Validar que todos los datos sean correctos
        if (nombre !== 'DNI no existe' && nombre && dni && centroId && fecha && horarios) {
            // Construir la URL con todos los parámetros
            const url = `/canepa?nombre=${encodeURIComponent(nombre)}&dni=${encodeURIComponent(dni)}&centroId=${encodeURIComponent(centroId)}&fecha=${encodeURIComponent(fecha)}&horarios=${encodeURIComponent(horarios)}&total=${encodeURIComponent(total)}`;

            // Redirige a la URL con los datos
            window.location.href = url;
        } else {
            alert('Faltan algunos datos o el DNI no es válido, por favor revise el formulario.');
        }
    });
});