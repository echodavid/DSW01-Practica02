# Implementation Plan: Frontend CRUD Empleados

**Branch**: `004-frontend-empleados` | **Date**: 2026-03-27 | **Spec**: specs/004-frontend-empleados/spec.md

## Summary
Crear un frontend independiente en `frontend/` que use Node/npm (sin Angular CLI) y soporte login por email/password con un usuario `master`. El frontend consumirá la API backend existente de empleados y manejará JWT para autenticación (logout al expirar o ser inválido). El desarrollo se ejecutará con `npm start --watch`.

## Technical Context
**Language/Version**: JavaScript (ES2020+), Node 18+ (o similar)
**Primary Dependencies**: axios, parcel/vite, brotli, lint
**Storage**: REST API backend (Spring Boot + PostgreSQL)
**Testing**: Jest + Testing Library (opcional) / pruebas manuales de flujo
**Target Platform**: Navegador web moderno (desktop + mobile)
**Project Type**: frontend SPA (monorepo) asociado a backend
**Performance Goals**: <200ms en página de lista con 100 registros, <2s bootstrap store
**Constraints**: No Angular CLI; `npm start --watch`; debe funcionar con `frontend/package.json` y `npm script`
**Scale/Scope**: CRUD de empleados, login JWT, roles base (master), UI responsiva.

## Constitution Check
Requiere cumplimiento con Outdoor Constitution:
- permitir frontend en monorepo con Node/npm (actualizado)
- JWT expiración obligatoria y re-autenticación
- Mínimo 80% endpoints documentados

## Project Structure
specs/004-frontend-empleados/
├── spec.md
├── plan.md
├── tasks.md
└── checklists/requirements.md

backend/
└── ... (existente)
frontend/
├── package.json
├── public/index.html
└── src/
    ├── app.js
    ├── api.js
    ├── auth.js
    ├── pages/Login.js
    ├── pages/EmpleadoList.js
    ├── pages/EmpleadoForm.js
    └── styles.css

## Complexity Tracking
- Se adopta SPA ligero en Vanilla/Parcel para evitar Angular CLI
- Se añade login y JWT mediante middleware interceptores

## Phase 0: Outline & Research
1. Definir stack: Parcel o Vite + Axios
2. Definir esquema JWT del backend
3. Revisar mutaciones de endpoint /auth/login y /empleados

## Phase 1: Design & Contracts
1. Data model de frontend y API contracts
2. UX flow: login -> lista empleados -> editar/crear -> logout
3. Componentes y rutas
4. Documentos: data-model.md, quickstart.md, contracts/

## Phase 2: Implementation
1. Setup /frontend + package.json
2. Login y rutas protegidas
3. CRUD empleados
4. Manejo de sesión/JWT y expiración
5. Pruebas unitarias y e2e ligeras
6. Ajustes UI y responsive

## Phase 3: Validation
1. Correr `npm start --watch`
2. Correr backend + verificar API
test
3. Verificar checklist requirements
4. Actualizar README monorepo

## Phase 4: Handoff
1. Documentar cómo ejecutar y desplegar.
2. Exportar pruebas manuales y criterios de aceptación.

