# Especificación: Frontend CRUD Empleados

## Objetivo
Crear un frontend Angular (Node/npm, sin Angular CLI) para gestionar empleados, con login (email y password) y usuario master.

## Requerimientos
- CRUD de empleados (crear, leer, actualizar, eliminar)
- Login con email y password
- Usuario master por defecto
- Interfaz responsiva y moderna
- Consumo de API backend existente
- Manejo de sesión y JWT

## Casos de uso
- Login de usuario master
- Crear empleado
- Editar empleado
- Eliminar empleado
- Listar empleados

## Restricciones
- Solo Node/npm, sin Angular CLI
- Frontend en carpeta /frontend
- npm start --watch para desarrollo
- Si el JWT expira o es inválido, expulsar al usuario y redirigir a login (sin navegación limitada de estado expirado)
- El backend actual usa `POST /v1/auth/login` con body `{ clave, password }` y retorna JWT.
- El token debe enviarse en header `Authorization: Bearer <token>`.

## API
- POST /v1/auth/login
- GET /v1/empleados
- POST /v1/empleados
- PUT /v1/empleados/{clave}
- DELETE /v1/empleados/{clave}

## Modelo de datos
- Empleado: id, nombre, email, password, departamento (opcional)
- Usuario master: email, password

## Clarificaciones
- Q: ¿Cuál es el contrato real de autenticación del backend? → A: `POST /v1/auth/login` con body `{ clave, password }`, JWT devuelto en respuesta y enviado en header `Authorization: Bearer <token>`.  
- Q: ¿Qué debe pasar en caso de expiración de JWT? → A: expulsar al usuario y redirigir a login.
