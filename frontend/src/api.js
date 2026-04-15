import axios from 'axios';
import { getToken, logout } from './auth.js';

const api = axios.create({
  baseURL: '/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      logout();
      window.location.hash = 'login';
    }
    return Promise.reject(error);
  }
);

export async function login(email, password) {
  return api.post('/auth/login', { clave: email, password });
}

export async function getEmpleados() {
  return api.get('/empleados');
}

export async function getEmpleado(clave) {
  return api.get(`/empleados/${encodeURIComponent(clave)}`);
}

export async function createEmpleado(body) {
  return api.post('/empleados', body);
}

export async function updateEmpleado(clave, body) {
  return api.put(`/empleados/${encodeURIComponent(clave)}`, body);
}

export async function deleteEmpleado(clave) {
  return api.delete(`/empleados/${encodeURIComponent(clave)}`);
}
