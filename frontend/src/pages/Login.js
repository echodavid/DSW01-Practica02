import { login } from '../api.js';
import { setToken, setCurrentUser } from '../auth.js';

export function renderLogin(container) {
  container.innerHTML = `
    <section class="page login-page">
      <div class="card">
        <h1>Iniciar sesión</h1>
        <form id="loginForm">
          <label>Email</label>
          <input type="text" id="email" placeholder="master@domain.com" required />
          <label>Contraseña</label>
          <input type="password" id="password" placeholder="password" required />
          <button type="submit">Entrar</button>
          <div class="form-error" id="loginError"></div>
        </form>
      </div>
    </section>
  `;

  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const error = document.getElementById('loginError');
    error.textContent = '';

    try {
      const response = await login(email, password);
      setToken(response.data.token || response.data); // some backend return token directly
      setCurrentUser(email);
      window.location.hash = 'empleados';
    } catch (err) {
      error.textContent = 'Credenciales inválidas. Intenta nuevamente.';
    }
  });
}
