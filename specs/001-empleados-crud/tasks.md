---

description: "Task list for CRUD de empleados with paginación"
---

# Tasks: CRUD de empleados

**Input**: Design documents from `/specs/001-empleados-crud/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure in src/main/java/com/example/empleados/
- [X] T002 Initialize Spring Boot 3 project with Java 17 and dependencies in pom.xml
- [X] T003 [P] Configure PostgreSQL connection in src/main/resources/application.properties
- [X] T004 [P] Configure Swagger documentation in src/main/resources/application.properties
- [X] T005 [P] Configure Dockerfile and docker-compose.yml for dev/staging

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T006 Create Empleado entity in src/main/java/com/example/empleados/Empleado.java
- [X] T007 Create EmpleadoRepository interface in src/main/java/com/example/empleados/EmpleadoRepository.java
- [X] T008 Create EmpleadoService class in src/main/java/com/example/empleados/EmpleadoService.java
- [X] T009 [P] Configure basic authentication (admin/admin123) in src/main/resources/application.properties
- [X] T010 [P] Add unit test setup in src/test/java/com/example/empleados/

---

## Phase 3: User Story 1 - Registrar empleado (P1)

**Goal**: Permitir registrar empleados con clave, nombre, dirección y teléfono (todos string de 100 caracteres, clave única)
**Independent Test Criteria**: Registrar un empleado y consultar que aparece en la lista

- [X] T011 [US1] Implement endpoint POST /empleados in src/main/java/com/example/empleados/EmpleadoController.java
- [X] T012 [US1] Validate fields (100 chars, clave única) in src/main/java/com/example/empleados/EmpleadoService.java
- [X] T013 [US1] Add unit and integration tests for registro in src/test/java/com/example/empleados/

---

## Phase 4: User Story 2 - Consultar empleados con paginación (P2)

**Goal**: Consultar empleados con paginación (por defecto 5 registros, tamaño de página configurable, página específica)
**Independent Test Criteria**: Consultar lista paginada, cambiar tamaño de página, solicitar página, manejar página vacía

- [X] T014 [US2] Implement endpoint GET /empleados with pagination in src/main/java/com/example/empleados/EmpleadoController.java
- [X] T015 [US2] Implement paginación logic (default 5, configurable, page selection) in src/main/java/com/example/empleados/EmpleadoService.java
- [X] T016 [US2] Validate page size and page range in src/main/java/com/example/empleados/EmpleadoService.java
- [X] T017 [US2] Add unit and integration tests for paginación in src/test/java/com/example/empleados/
- [X] T017a [US2] Add unit and integration tests for empty page result (solicitar página fuera de rango) in src/test/java/com/example/empleados/

---

## Phase 5: User Story 3 - Actualizar empleado (P3)

**Goal**: Actualizar nombre, dirección o teléfono de un empleado existente usando la clave
**Independent Test Criteria**: Actualizar campo y verificar el cambio

- [X] T018 [US3] Implement endpoint PUT /empleados/{clave} in src/main/java/com/example/empleados/EmpleadoController.java
- [X] T019 [US3] Validate update fields (100 chars) in src/main/java/com/example/empleados/EmpleadoService.java
- [X] T020 [US3] Add unit and integration tests for actualización in src/test/java/com/example/empleados/

---

## Phase 6: User Story 4 - Eliminar empleado (P4)

**Goal**: Eliminar empleado usando la clave
**Independent Test Criteria**: Eliminar y verificar que no aparece en la lista

- [ ] T021 [US4] Implement endpoint DELETE /empleados/{clave} in src/main/java/com/example/empleados/EmpleadoController.java
- [ ] T022 [US4] Add unit and integration tests for eliminación in src/test/java/com/example/empleados/

---

## Final Phase: Polish & Cross-Cutting Concerns

- [X] T023 [P] Add Swagger annotations to all endpoints in src/main/java/com/example/empleados/EmpleadoController.java
- [X] T024 [P] Add error handling for edge cases (block size, page out of range, fields) in src/main/java/com/example/empleados/EmpleadoController.java
- [X] T025 [P] Add integration tests for edge cases (block size negativo/cero, página fuera de rango, campos faltantes/inválidos) in src/test/java/com/example/empleados/
- [X] T026 [P] Update Dockerfile and docker-compose.yml for staging/production

---

## Dependencies

- US1 → US2 → US3 → US4 (consultar depende de registro, actualizar/eliminar dependen de consulta)

## Parallel Execution Examples

- T003, T004, T005, T009, T010, T023, T024, T025, T026 can run in parallel
- All user story phases are independently testable

## Implementation Strategy

- MVP: Completar US1 y US2 (registro y consulta con paginación)
- Incremental delivery: US3 (actualización), US4 (eliminación), polish
