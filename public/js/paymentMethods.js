// Función para obtener los parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        nombre: params.get('nombre'),
        dni: params.get('dni'),
        centroId: params.get('centroId'),
        fecha: params.get('fecha'),
        horarios: params.get('horarios'),
        total: params.get('total'),
    };
}

// Lógica principal que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos de los métodos de pago
    const method1 = document.getElementById('method1');
    const method2 = document.getElementById('method2');
    let selectedMethod = null; // Variable para almacenar el método seleccionado

    // Función para manejar la selección del método de pago
    function selectMethod(method) {
        // Eliminar la clase 'selected' de ambos métodos
        method1.classList.remove('selected');
        method2.classList.remove('selected');

        // Agregar la clase 'selected' al método seleccionado
        if (method === 1) {
            method1.classList.add('selected');
            selectedMethod = 1; // Guardar el método seleccionado
        } else if (method === 2) {
            method2.classList.add('selected');
            selectedMethod = 2; // Guardar el método seleccionado
        }
    }

    // Agregar eventos 'click' a cada método para seleccionar
    method1.addEventListener('click', function() {
        selectMethod(1);
    });

    method2.addEventListener('click', function() {
        selectMethod(2);
    });

    // Obtener los parámetros de la URL
    const { nombre, dni, centroId, fecha, horarios, total } = getQueryParams();

    // Obtener el botón de cancelar por su ID
    const cancelBtn = document.getElementById('cancel-btn');

    // Redirigir cuando se haga clic en el botón de cancelar
    cancelBtn.addEventListener('click', function() {
        const url = `/cesar?nombre=${encodeURIComponent(nombre)}&dni=${encodeURIComponent(dni)}&centroId=${encodeURIComponent(centroId)}&fecha=${encodeURIComponent(fecha)}&horarios=${encodeURIComponent(horarios)}&total=${encodeURIComponent(total)}&metodo=${selectedMethod}`;
        window.location.href = url;
    });
});