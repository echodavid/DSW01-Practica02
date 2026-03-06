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

- [X] T021 [US4] Implement endpoint DELETE /empleados/{clave} in src/main/java/com/example/empleados/EmpleadoController.java
- [X] T022 [US4] Add unit and integration tests for eliminación in src/test/java/com/example/empleados/

---

## Final Phase: Polish & Cross-Cutting Concerns

- [X] T023 [P] Add Swagger annotations to all endpoints in src/main/java/com/example/empleados/EmpleadoController.java
- [X] T024 [P] Add error handling for edge cases (block size, page out of range, fields) in src/main/java/com/example/empleados/EmpleadoController.java
- [X] T025 [P] Add integration tests for edge cases (block size negativo/cero, página fuera de rango, campos faltantes/inválidos) in src/test/java/com/example/empleados/
- [X] T026 [P] Update Dockerfile and docker-compose.yml for staging/production

---

## Phase 7: Security & Authentication (JWT Implementation)

**Purpose**: Implement JWT authentication and password hashing for all endpoints

- [X] T027 [SEC] Add JWT dependencies (JJWT) to pom.xml
- [X] T028 [SEC] Create JwtUtil class for token generation/validation in src/main/java/com/example/empleados/JwtUtil.java
- [X] T029 [SEC] Create LoginRequest DTO in src/main/java/com/example/empleados/LoginRequest.java
- [X] T030 [SEC] Create AuthController for login endpoint in src/main/java/com/example/empleados/AuthController.java
- [X] T031 [SEC] Configure Spring Security with JWT in src/main/java/com/example/empleados/SecurityConfig.java
- [X] T032 [SEC] Create JwtAuthenticationFilter in src/main/java/com/example/empleados/JwtAuthenticationFilter.java
- [X] T033 [SEC] Add password hashing with BCrypt in EmpleadoService.java
- [X] T034 [SEC] Update Empleado entity to include password field
- [X] T035 [SEC] Add admin user initialization in EmpleadosApplication.java
- [X] T036 [SEC] Update all endpoints to use /v1/ API versioning
- [X] T037 [SEC] Protect all /v1/empleados endpoints with JWT authentication
- [X] T038 [SEC] Update application.properties with JWT secret and security settings

---

## Phase 8: API Testing & Documentation

**Purpose**: Create comprehensive API testing suite with Bruno

- [X] T039 [TEST] Create Bruno collection structure in dsw02/ directory
- [X] T040 [TEST] Create login.yml request file for JWT authentication
- [X] T041 [TEST] Create post.yml for employee creation testing
- [X] T042 [TEST] Create get.yml for employee listing with pagination
- [X] T043 [TEST] Create getId.yml for individual employee retrieval
- [X] T044 [TEST] Create update.yml for employee update testing
- [X] T045 [TEST] Create delete.yml for employee deletion testing
- [X] T046 [TEST] Create opencollection.yml for collection configuration
- [X] T047 [TEST] Create test-empleados.sh automated testing script
- [X] T048 [TEST] Standardize all Bruno files with proper JSON body format
- [X] T049 [TEST] Add descriptive comments to all Bruno request files
- [X] T050 [TEST] Create README.md documentation for Bruno collection usage
- [X] T051 [TEST] Validate complete API testing workflow (login → CRUD operations)

## Dependencies

- US1 → US2 → US3 → US4 (consultar depende de registro, actualizar/eliminar dependen de consulta)

## Parallel Execution Examples

- T003, T004, T005, T009, T010, T023, T024, T025, T026 can run in parallel
- All user story phases are independently testable

## Implementation Strategy

- MVP: Completar US1 y US2 (registro y consulta con paginación)
- Incremental delivery: US3 (actualización), US4 (eliminación), polish
