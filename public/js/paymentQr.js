// Función para obtener parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        nombre: params.get('nombre'),
        dni: params.get('dni'),
        centroId: params.get('centroId'),
        fecha: params.get('fecha'),
        horarios: params.get('horarios'),
        total: params.get('total'),
        metodo: params.get('metodo'),
    };
}

// Mostrar el modal después de 3 segundos
setTimeout(function () {
    const paymentModal = document.getElementById('paymentModal');
    paymentModal.style.display = 'flex'; // Mostrar el modal
}, 3000); // Esperar 3 segundos

// Manejar el clic en el botón de aceptar
document.getElementById('accept-btn').addEventListener('click', function() {
    const { nombre, dni, centroId, fecha, horarios, total, metodo } = getQueryParams();
    const url = `/bonifaz?nombre=${encodeURIComponent(nombre)}&dni=${encodeURIComponent(dni)}&centroId=${encodeURIComponent(centroId)}&fecha=${encodeURIComponent(fecha)}&horarios=${encodeURIComponent(horarios)}&total=${encodeURIComponent(total)}&metodo=${encodeURIComponent(metodo)}`;
    window.location.href = url; // Redirigir a bonifaz
});

// Manejar el clic en el botón de cancelar
document.getElementById('cancel-btn').addEventListener('click', function() {
    const { nombre, dni, centroId, fecha, horarios, total, metodo } = getQueryParams();
    const url = `/cesar?nombre=${encodeURIComponent(nombre)}&dni=${encodeURIComponent(dni)}&centroId=${encodeURIComponent(centroId)}&fecha=${encodeURIComponent(fecha)}&horarios=${encodeURIComponent(horarios)}&total=${encodeURIComponent(total)}&metodo=${encodeURIComponent(metodo)}`;
    window.location.href = url; // Redirigir a cesar
});

// Cerrar el modal al hacer clic en la X
document.querySelector('.close').addEventListener('click', function() {
    const paymentModal = document.getElementById('paymentModal');
    paymentModal.style.display = 'none'; // Ocultar el modal
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.onclick = function(event) {
    const paymentModal = document.getElementById('paymentModal');
    if (event.target === paymentModal) {
        paymentModal.style.display = 'none'; // Ocultar el modal
    }
};