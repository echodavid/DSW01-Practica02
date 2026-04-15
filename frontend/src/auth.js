const TOKEN_KEY = 'empleados_token';
const USER_KEY = 'empleados_user';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, user);
}

export function getCurrentUser() {
  return localStorage.getItem(USER_KEY);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

export function logout() {
  clearAuth();
}
