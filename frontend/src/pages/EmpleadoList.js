import { getEmpleados, deleteEmpleado } from '../api.js';

export async function renderEmpleadoList(container) {
  container.innerHTML = `
    <section class="page list-page">
      <div class="page-header">
        <h1>Empleados</h1>
        <div>
          <a href="#empleado/new" class="btn">Crear empleado</a>
        </div>
      </div>
      <div id="listError" class="form-error"></div>
      <div id="empleadoTable"></div>
    </section>
  `;

  const tableContainer = document.getElementById('empleadoTable');
  const listError = document.getElementById('listError');
  listError.textContent = '';

  try {
    const response = await getEmpleados();
    const empleados = response.data.content || response.data;

    if (!Array.isArray(empleados)) {
      throw new Error('Formato de empleados inválido');
    }

    if (empleados.length === 0) {
      tableContainer.innerHTML = '<p>No se encontraron empleados.</p>';
      return;
    }

    const rows = empleados
      .map((empleado) => {
        const departamento = empleado.departamento ? empleado.departamento.nombre || empleado.departamento.id : 'Sin departamento';
        return `
          <tr>
            <td>${empleado.clave || ''}</td>
            <td>${empleado.nombre || ''}</td>
            <td>${empleado.direccion || ''}</td>
            <td>${empleado.telefono || ''}</td>
            <td>${departamento}</td>
            <td>
              <a class="btn small" href="#empleado/edit?clave=${encodeURIComponent(empleado.clave)}">Editar</a>
              <button class="btn small danger" data-clave="${empleado.clave}">Eliminar</button>
            </td>
          </tr>
        `;
      })
      .join('');

    tableContainer.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>ID / Email</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;

    tableContainer.querySelectorAll('button[data-clave]').forEach((button) => {
      button.addEventListener('click', async () => {
        const clave = button.dataset.clave;
        if (!confirm('¿Eliminar este empleado?')) return;
        try {
          await deleteEmpleado(clave);
          window.location.hash = 'empleados';
          window.location.reload();
        } catch (error) {
          listError.textContent = 'No se pudo eliminar el empleado.';
        }
      });
    });
  } catch (error) {
    listError.textContent = 'Error cargando empleados.';
  }
}
