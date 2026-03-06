# Tasks: Employee Authentication and API Enhancements

**Input**: Design documents from `/specs/002-employee-auth-api-versioning/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Add Spring Security, JJWT, and Spring Boot Starter Validation dependencies to pom.xml
- [X] T002 [P] Configure Maven for new dependencies

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Update Employee entity with password field in src/main/java/com/example/empleados/Empleado.java
- [X] T004 [P] Create JWT utility class for token generation and validation in src/main/java/com/example/empleados/JwtUtil.java
- [X] T005 Setup Spring Security configuration in src/main/java/com/example/empleados/SecurityConfig.java

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Employee Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable employees to authenticate using ID and password, receiving JWT tokens for API access

**Independent Test**: Can be fully tested by attempting login with valid/invalid credentials and verifying token issuance or error responses, delivering secure access to the system.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

- [X] T006 [P] [US1] Integration test for authentication endpoint in src/test/java/com/example/empleados/EmpleadoControllerTest.java

### Implementation for User Story 1

- [X] T007 [US1] Implement login endpoint in EmpleadoController.java
- [X] T008 [US1] Add JWT token generation on successful login
- [X] T009 [US1] Configure protected endpoints to require authentication

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - API Versioning (Priority: P2)

**Goal**: Version API endpoints under /v1/ prefix for future compatibility

**Independent Test**: Can be fully tested by accessing endpoints with version prefixes and verifying consistent behavior across requests.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [X] T010 [P] [US2] Integration test for versioned endpoints in src/test/java/com/example/empleados/EmpleadoControllerTest.java

### Implementation for User Story 2

- [X] T011 [US2] Add @RequestMapping("/v1") to EmpleadoController.java
- [X] T012 [US2] Update all endpoint paths to include /v1/ prefix

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Pagination for Lists (Priority: P3)

**Goal**: Support paginated responses for list endpoints with page and size parameters

**Independent Test**: Can be fully tested by requesting lists with pagination parameters and verifying correct subset of data is returned.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [X] T013 [P] [US3] Integration test for paginated list endpoint in src/test/java/com/example/empleados/EmpleadoControllerTest.java

### Implementation for User Story 3

- [X] T014 [US3] Update list endpoint to accept Pageable parameters in EmpleadoController.java
- [X] T015 [US3] Modify EmpleadoService to return Page<Employee>
- [X] T016 [US3] Return pagination metadata in response

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T017 [P] Update existing tests to work with authentication and versioning
- [X] T018 Code cleanup and refactoring
- [X] T019 [P] Documentation updates in README.md
- [X] T020 [P] Add Swagger/OpenAPI configuration and annotations to controllers
- [X] T021 [P] Verify documentation accessible at /swagger-ui
- [X] T022 Update CI pipeline to run new authentication and pagination tests

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Integration test for authentication endpoint in src/test/java/com/example/empleados/EmpleadoControllerTest.java"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence</content>
<parameter name="filePath">/Volumes/david/UV/Semestres/6to/Despliegue/DSW01-Practiva02/specs/002-employee-auth-api-versioning/tasks.md