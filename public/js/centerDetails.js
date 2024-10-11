// Obtener el parámetro "centro" de la URL
const urlParams = new URLSearchParams(window.location.search);
const centroId = urlParams.get('centro');

// Definir los nombres de los centros deportivos basados en el id
const centrosDeportivos = {
    1: 'Centro Deportivo 1',
    2: 'Centro Deportivo 2',
    3: 'Centro Deportivo 3',
    4: 'Centro Deportivo 4',
};

// Seleccionar el elemento donde vas a mostrar el título
const titleElement = document.querySelector('.title');

// Mostrar el nombre del centro deportivo basado en el id
if (centroId && centrosDeportivos[centroId]) {
    titleElement.textContent = `${centrosDeportivos[centroId]}`;
} else {
    titleElement.textContent = `Centro Deportivo no encontrado`;
}

// Obtener la fecha de hoy
const hoy = new Date();
const dd = String(hoy.getDate()).padStart(2, '0');
const mm = String(hoy.getMonth() + 1).padStart(2, '0'); // Enero es 0
const yyyy = hoy.getFullYear();
const fechaMinima = `${yyyy}-${mm}-${dd}`;

// Establecer el atributo min del input de fecha a hoy
const inputFecha = document.getElementById('fecha');
inputFecha.setAttribute('min', fechaMinima); // Aquí se establece el atributo min
inputFecha.value = fechaMinima; // Opcional: establecer la fecha actual como valor predeterminado

// Manejar la interacción del dropdown de horarios
const toggleButton = document.getElementById('toggleDropdown');
const dropdownContent = document.querySelector('.dropdown-content');

toggleButton.addEventListener('click', () => {
    console.log('Botón clicado'); // Esto ayudará a verificar si el evento está funcionando
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Calcular y actualizar el costo total
const costoPorHorario = 50; // Costo por cada horario seleccionado
const totalElement = document.querySelector('.total');
const selectedHoursContainer = document.querySelector('.selected-hours'); // Contenedor para horarios seleccionados

// Función para actualizar la lista de horarios seleccionados
function actualizarListaSeleccionados() {
    // Limpiar la lista actual
    selectedHoursContainer.innerHTML = '';

    // Obtener los horarios seleccionados
    const horariosSeleccionados = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Agregar cada horario seleccionado al contenedor
    horariosSeleccionados.forEach(horario => {
        const horarioElemento = document.createElement('div');
        horarioElemento.textContent = horario; // Mostrar el horario seleccionado
        selectedHoursContainer.appendChild(horarioElemento);
    });
}

// Función para actualizar el total
function actualizarTotal() {
    // Contar el número de horarios seleccionados
    let seleccionados = document.querySelectorAll('input[name="horarios"]:checked').length;

    // Calcular el costo total
    let total = seleccionados * costoPorHorario;

    // Mostrar el total en el elemento correspondiente
    totalElement.textContent = `Total: s/${total}`;

    // Actualizar la lista de horarios seleccionados
    actualizarListaSeleccionados();
}

// Manejar la selección de horarios
const checkboxes = document.querySelectorAll('input[name="horarios"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        actualizarTotal(); // Actualizar el total al cambiar selección

        if (event.target.checked) {
            console.log(`${event.target.value} seleccionado`);
        } else {
            console.log(`${event.target.value} deseleccionado`);
            // Actualizar la lista después de deseleccionar
            actualizarListaSeleccionados();
        }
    });
});

// Cerrar el dropdown al hacer clic fuera
window.addEventListener('click', (event) => {
    if (!toggleButton.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});

// Manejo de errores y reserva
const reservarBtn = document.querySelector('.reserve-btn');
const errorFecha = document.createElement('p');
const errorHorario = document.createElement('p');

function mostrarError(mensaje, elemento) {
    elemento.textContent = mensaje;
    elemento.style.color = 'red';
    elemento.style.fontSize = '12px';
    elemento.style.display = 'block';
}

inputFecha.parentElement.appendChild(errorFecha);
dropdownContent.parentElement.appendChild(errorHorario);

reservarBtn.addEventListener('click', (event) => {
    const fechaSeleccionada = inputFecha.value;
    const horariosSeleccionados = Array.from(checkboxes).some(checkbox => checkbox.checked);
    let formValid = true;

    // Verificar la fecha
    if (!fechaSeleccionada) {
        mostrarError('Es obligatorio seleccionar una fecha', errorFecha);
        formValid = false;
    } else {
        errorFecha.style.display = 'none';
    }

    // Verificar los horarios
    if (!horariosSeleccionados) {
        mostrarError('Es obligatorio seleccionar al menos un horario', errorHorario);
        formValid = false;
    } else {
        errorHorario.style.display = 'none';
    }

    // Evitar el envío si no es válido
    if (formValid) {
        const selectedHours = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value).join(', ');
        const total = costoPorHorario * document.querySelectorAll('input[name="horarios"]:checked').length;
        const centroId = document.querySelector('#centroId').value;
        const url = `/neil?fecha=${encodeURIComponent(fechaSeleccionada)}&horarios=${encodeURIComponent(selectedHours)}&total=${total}&centroId=${centroId}`;
        window.location.href = url; // Redirigir a la página con los parámetros
    } else {
        event.preventDefault(); // Evitar el envío del formulario
    }
});