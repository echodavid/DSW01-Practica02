#!/bin/bash

# Variables
USER="admin"
PASS="admin123"
BASE_URL="http://localhost:8080/empleados"

echo "=== Probando endpoints CRUD de Empleados ==="
echo

# 1. Listar empleados (GET) - debería funcionar
echo "1. Listar empleados (GET):"
curl -u "$USER:$PASS" -X GET "$BASE_URL?page=0&size=5"
echo -e "\n---\n"

# 2. Crear empleado (POST)
echo "2. Crear empleado (POST):"
curl -u "$USER:$PASS" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"clave": "E001", "nombre": "Juan Perez", "direccion": "Calle 123", "telefono": "555-1234"}'
echo -e "\n---\n"

# 3. Consultar empleado por clave (GET)
echo "3. Consultar empleado por clave (GET):"
curl -u "$USER:$PASS" -X GET "$BASE_URL/E001"
echo -e "\n---\n"

# 4. Actualizar empleado (PUT)
echo "4. Actualizar empleado (PUT):"
curl -u "$USER:$PASS" -X PUT "$BASE_URL/E001" \
  -H "Content-Type: application/json" \
  -d '{"clave": "E001", "nombre": "Juan Perez", "direccion": "Calle 456", "telefono": "555-5678"}'
echo -e "\n---\n"

# 5. Eliminar empleado (DELETE)
echo "5. Eliminar empleado (DELETE):"
curl -u "$USER:$PASS" -X DELETE "$BASE_URL/E001"
echo -e "\n---\n"

echo "=== Fin de pruebas ==="
