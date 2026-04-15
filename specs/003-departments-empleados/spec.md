# Especificación: Departments-Empleados

## Objetivo
Agregar la entidad Departamento y permitir la asignación de empleados a departamentos. Los empleados pueden estar sin departamento.

## Requerimientos
- Crear tabla `departamentos`.
- Modificar tabla `empleados` para permitir asignar un departamento (nullable).
- Endpoint para asignar empleado a departamento.
- Endpoints de empleados deben mostrar el departamento asignado (o null).
- Endpoints de departamentos para CRUD básico.

## Casos de uso
- Crear departamento.
- Crear empleado con o sin departamento.
- Asignar empleado a departamento.
- Consultar empleados mostrando departamento.
- Consultar departamentos y sus empleados.

## Restricciones
- Un empleado puede no tener departamento.
- Un departamento puede tener cero o más empleados.

## API
- POST /departamentos
- GET /departamentos
- GET /departamentos/{id}
- POST /empleados (con departamento opcional)
- PUT /empleados/{id}/departamento (asignar/quitar departamento)
- GET /empleados (mostrar departamento)

## Modelo de datos
- Departamento: id, nombre
- Empleado: id, nombre, departamento_id (nullable)
