# Tasks: Departments-Empleados

## Fase 1: Setup (creación de tablas y entidades)
- [ ] T001 [P] Crear entidad Departamento en src/main/java/com/example/empleados/Departamento.java
- [ ] T002 [P] Crear tabla departamentos en src/main/resources/application.properties (o migración SQL)
- [ ] T003 [P] Modificar entidad Empleado para agregar departamento_id nullable en src/main/java/com/example/empleados/Empleado.java
- [ ] T004 [P] Modificar tabla empleados para agregar departamento_id nullable en src/main/resources/application.properties (o migración SQL)

## Fase 2: Fundacional (modificaciones necesarias para empleados)
- [ ] T005 Modificar EmpleadoRepository para soportar departamento_id en src/main/java/com/example/empleados/EmpleadoRepository.java
- [ ] T006 Modificar EmpleadoService para lógica de asignación/quitar departamento en src/main/java/com/example/empleados/EmpleadoService.java

## Fase 3: User Stories
### [US1] CRUD departamentos
- [ ] T007 [P] [US1] Implementar DepartamentoController con endpoints CRUD en src/main/java/com/example/empleados/DepartamentoController.java
- [ ] T008 [P] [US1] Implementar DepartamentoService en src/main/java/com/example/empleados/DepartamentoService.java
- [ ] T009 [US1] Actualizar pruebas de CRUD departamentos en test/java/com/example/empleados/DepartamentoControllerTest.java

### [US2] Asignación empleado-departamento
- [ ] T010 [P] [US2] Implementar endpoint para asignar/quitar departamento a empleado en src/main/java/com/example/empleados/EmpleadoController.java
- [ ] T011 [US2] Actualizar pruebas de asignación/quitar departamento en test/java/com/example/empleados/EmpleadoControllerTest.java

### [US3] Endpoints GET actualizados
- [ ] T012 [P] [US3] Modificar GET empleados para mostrar departamento en src/main/java/com/example/empleados/EmpleadoController.java
- [ ] T013 [P] [US3] Modificar GET departamentos para mostrar empleados en src/main/java/com/example/empleados/DepartamentoController.java
- [ ] T014 [US3] Actualizar pruebas de GET empleados/departamentos en test/java/com/example/empleados/EmpleadoControllerTest.java y DepartamentoControllerTest.java

## Fase final: Pruebas y polish
- [ ] T015 [P] Revisar y actualizar documentación en README.md
- [ ] T016 [P] Refactorizar código y limpiar warnings en src/main/java/com/example/empleados/
- [ ] T017 [P] Validar cobertura de pruebas en test/java/com/example/empleados/

---

## Dependencias
- Fase 1 → Fase 2 → Fase 3 → Fase final
- Dentro de Fase 3, [US1] puede ejecutarse en paralelo con [US2] y [US3] tras completar Fase 2

## Ejemplo de ejecución paralela
- T001, T002, T003, T004 pueden ejecutarse en paralelo
- T007, T008, T010, T012, T013 pueden ejecutarse en paralelo tras Fase 2

## Criterios de prueba independientes
- [US1]: CRUD departamentos funciona y pasa pruebas unitarias
- [US2]: Asignación/quitar departamento a empleado funciona y pasa pruebas
- [US3]: GET empleados y departamentos muestran datos correctos, pruebas actualizadas

## MVP sugerido
- Completar [US1] y [US2]: CRUD departamentos y asignación empleado-departamento

---

_Todas las tareas siguen el formato checklist estricto y son ejecutables por LLM._
