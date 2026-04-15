import { createEmpleado, updateEmpleado, getEmpleado } from '../api.js';

function createFormHtml(empleado = {}) {
  return `
    <section class="page form-page">
      <div class="card">
        <h1>${empleado.clave ? 'Editar empleado' : 'Crear empleado'}</h1>
        <form id="empleadoForm">
          <label>Email</label>
          <input type="text" id="clave" value="${empleado.clave || ''}" placeholder="email@dominio.com" required ${empleado.clave ? 'readonly' : ''} />

          <label>Nombre</label>
          <input type="text" id="nombre" value="${empleado.nombre || ''}" required />

          <label>Dirección</label>
          <input type="text" id="direccion" value="${empleado.direccion || ''}" required />

          <label>Teléfono</label>
          <input type="text" id="telefono" value="${empleado.telefono || ''}" required />

          <label>Contraseña</label>
          <input type="password" id="password" placeholder="Mantén vacío para no cambiar" />

          <label>Departamento ID</label>
          <input type="text" id="departamento" value="${empleado.departamento?.id || ''}" placeholder="ID departamento" />

          <button type="submit">Guardar</button>
          <div class="form-error" id="formError"></div>
        </form>
      </div>
    </section>
  `;
}

export async function renderEmpleadoForm(container, clave) {
  let empleado = {};
  if (clave) {
    try {
      const response = await getEmpleado(clave);
      empleado = response.data;
    } catch (error) {
      container.innerHTML = '<p>No se pudo cargar el empleado.</p>';
      return;
    }
  }

  container.innerHTML = createFormHtml(empleado);

  const form = document.getElementById('empleadoForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formError = document.getElementById('formError');
    formError.textContent = '';

    const empleadoData = {
      clave: document.getElementById('clave').value.trim(),
      nombre: document.getElementById('nombre').value.trim(),
      direccion: document.getElementById('direccion').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      password: document.getElementById('password').value.trim(),
      departamento: null
    };

    const departamentoId = document.getElementById('departamento').value.trim();
    if (departamentoId) {
      empleadoData.departamento = { id: Number(departamentoId) };
    }

    if (!empleadoData.password) {
      delete empleadoData.password;
    }

    try {
      if (clave) {
        await updateEmpleado(clave, empleadoData);
      } else {
        await createEmpleado(empleadoData);
      }
      window.location.hash = 'empleados';
    } catch (error) {
      formError.textContent = 'No se pudo guardar el empleado.';
    }
  });
}
