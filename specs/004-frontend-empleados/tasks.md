# Tasks: Frontend CRUD Empleados

## Fase 1: Setup (monorepo + inicialización frontend)
- [ ] T001 [P] Crear carpeta `frontend/` en la raíz del repo
- [ ] T002 [P] Generar `frontend/package.json` con scripts `start:watch`, `build`, `test`
- [ ] T003 [P] Instalar dependencias: `axios`, `parcel` (o `vite`), `dotenv`, `jest`, `@testing-library/dom`
- [ ] T004 [P] Crear archivos base:
    - `frontend/public/index.html`
    - `frontend/src/index.js`
    - `frontend/src/styles.css`

## Fase 2: Autenticación y sesión (login JWT)
- [ ] T005 [US1] Implementar `frontend/src/pages/Login.js` para login con `email`/`password`
- [ ] T006 [US1] Implementar `frontend/src/api/auth.js` con POST `/auth/login`
- [ ] T007 [US1] Implementar `frontend/src/auth.js` para guardar JWT y verificar expiración
- [ ] T008 [US1] Implementar guard de ruta protegida (interceptor que redirige a `/login` si JWT inválido)

## Fase 3: CRUD Empleados
- [ ] T009 [US2] Implementar lista de empleados en `frontend/src/pages/EmpleadoList.js` (GET `/empleados`)
- [ ] T010 [US2] Implementar creación y edición en `frontend/src/pages/EmpleadoForm.js` (POST/PUT `/empleados`)
- [ ] T011 [US2] Implementar eliminación en `EmpleadoList` (DELETE `/empleados/{id}`)

## Fase 4: Master user y roles
- [ ] T012 [US3] Definir usuario master default (`master@domain`) y UI/ACL mínimos
- [ ] T013 [US3] Mostrar estado de sesión y Logout en barra superior

## Fase 5: UI responsive
- [ ] T014 [P] Implementar estilos responsive en `frontend/src/styles.css`
- [ ] T015 [P] Verificar comportamiento en mobile + desktop

## Fase 6: Pruebas y documentación
- [ ] T016 [P] Añadir tests con Jest/Testing Library (`frontend/src/__tests__/`)
- [ ] T017 [P] Actualizar `frontend/README.md` y README raíz con instrucciones de ejecución

---
## Dependencias
- Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6
- Dentro de la Fase 3, [US1] debe estar lista antes de CRUD empleados

## Criterios de aceptación independientes
- [US1] Login con email/password + JWT + redirección.
- [US2] CRUD completo de empleados.
- [US3] Logout y rol master.

