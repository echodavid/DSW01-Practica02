# Frontend Empleados

Este frontend es una SPA ligera construida con Parcel y Axios para consumir la API del backend de empleados.

## Instalación

```bash
cd frontend
npm install
```

## Desarrollo

```bash
npm run start:watch
```

## Producción

```bash
npm run build
```

## URLs
- Login: `/#login`
- Lista de empleados: `/#empleados`
- Crear empleado: `/#empleado/new`

## Notas
- El frontend usa JWT almacenado en `localStorage`.
- Si el JWT expira o es inválido, el usuario se redirige a login.
- El backend debe estar corriendo en `http://localhost:8080`.
