import { renderLogin } from './pages/Login.js';
import { renderEmpleadoList } from './pages/EmpleadoList.js';
import { renderEmpleadoForm } from './pages/EmpleadoForm.js';
import { isAuthenticated, logout, getCurrentUser } from './auth.js';

const app = document.getElementById('app');

const routes = {
  login: renderLogin,
  empleados: renderEmpleadoList,
  'empleado-new': renderEmpleadoForm,
  'empleado-edit': renderEmpleadoForm,
};

function renderHeader() {
  const header = document.createElement('header');
  header.className = 'app-header';
  const title = document.createElement('div');
  title.className = 'app-brand';
  title.innerHTML = '<strong>Empleados</strong>';
  const nav = document.createElement('nav');

  if (isAuthenticated()) {
    const userName = getCurrentUser() || 'master';
    nav.innerHTML = `
      <span class="user-label">${userName}</span>
      <a href="#empleados">Listado</a>
      <button id="logoutBtn">Salir</button>
    `;
  }

  header.appendChild(title);
  header.appendChild(nav);
  return header;
}

function getRoute() {
  const hash = window.location.hash.slice(1);
  if (!hash) {
    return isAuthenticated() ? 'empleados' : 'login';
  }
  if (hash === 'login') return 'login';
  if (hash.startsWith('empleados')) return 'empleados';
  if (hash.startsWith('empleado/new')) return 'empleado-new';
  if (hash.startsWith('empleado/edit')) return 'empleado-edit';
  return isAuthenticated() ? 'empleados' : 'login';
}

function getRouteParams() {
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash.split('?')[1]);
  return { clave: params.get('clave') };
}

async function renderRoute() {
  const route = getRoute();
  if (route !== 'login' && !isAuthenticated()) {
    window.location.hash = 'login';
    return;
  }

  app.innerHTML = '';
  app.appendChild(renderHeader());

  const content = document.createElement('main');
  content.className = 'app-main';
  app.appendChild(content);

  if (route === 'empleado-edit') {
    await routes[route](content, getRouteParams().clave);
  } else {
    await routes[route](content);
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      window.location.hash = 'login';
    });
  }
}

export function startApp() {
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}
