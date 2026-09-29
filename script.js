// Arreglo para almacenar la lista de contactos en memoria
let contactos = [];

// Elementos del DOM
const formContacto = document.getElementById('form-contacto');
const nombreInput = document.getElementById('nombre-input');
const telefonoInput = document.getElementById('telefono-input');
const buscarInput = document.getElementById('buscar-input');
const listaContactos = document.getElementById('lista-contactos');
const totalContactosEl = document.getElementById('total-contactos');
const mensajeVacio = document.getElementById('mensaje-vacio');

// Actualiza el contador total (mantiene la cantidad real sin importar la búsqueda)
function actualizarContador() {
  totalContactosEl.textContent = contactos.length;
}

// Renderiza o dibuja los elementos de la lista dinámicamente en pantalla
function renderizarContactos(contactosAMostrar) {
  listaContactos.innerHTML = '';

  // Muestra u oculta el mensaje de "Todavía no agregaste contactos."
  if (contactos.length === 0) {
    mensajeVacio.style.display = 'block';
  } else {
    mensajeVacio.style.display = 'none';
  }

  contactosAMostrar.forEach((contacto) => {
    const li = document.createElement('li');
    li.className = 'contacto-item';

    li.innerHTML = `
      <div class="contacto-info">
        <span class="contacto-nombre">${contacto.nombre}</span>
        <span class="contacto-telefono">${contacto.telefono}</span>
      </div>
      <button class="btn-eliminar">Eliminar</button>
    `;

    // Event listener obligatorio para cada botón de eliminar
    const btnEliminar = li.querySelector('.btn-eliminar');
    btnEliminar.addEventListener('click', () => {
      eliminarContacto(contacto.id);
    });

    listaContactos.appendChild(li);
  });
}

// 1 y 2. Agregar un nuevo contacto (Valida que no estén vacíos los campos)
formContacto.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const telefono = telefonoInput.value.trim();

  // Si algún campo está vacío, no hace nada
  if (!nombre || !telefono) {
    return;
  }

  const nuevoContacto = {
    id: Date.now(),
    nombre: nombre,
    telefono: telefono
  };

  contactos.push(nuevoContacto);

  // Limpia los campos de texto
  nombreInput.value = '';
  telefonoInput.value = '';

  actualizarContador();
  filtrarContactos();
});

// 3. Eliminar un contacto por su ID
function eliminarContacto(id) {
  contactos = contactos.filter((contacto) => contacto.id !== id);
  actualizarContador();
  filtrarContactos();
}

// 4. Búsqueda y filtrado en tiempo real sin modificar el contador global
function filtrarContactos() {
  const texto = buscarInput.value.toLowerCase().trim();
  const filtrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(texto)
  );
  renderizarContactos(filtrados);
}

// Event listener obligatorio para la búsqueda en tiempo real
buscarInput.addEventListener('input', filtrarContactos);