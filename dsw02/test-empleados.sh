#!/bin/bash

# Variables
BASE_URL="http://localhost:8080"
LOGIN_URL="$BASE_URL/v1/auth/login"
EMPLOYEES_URL="$BASE_URL/v1/empleados"

# Credenciales para login
EMPLOYEE_ID="1"
EMPLOYEE_PASSWORD="admin123"

# Variable para almacenar el token JWT
JWT_TOKEN=""

# Función para log con timestamp
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Función para login y obtener token
login() {
    log "Realizando login para obtener token JWT..."
    response=$(curl -s -X POST "$LOGIN_URL" \
        -H "Content-Type: application/json" \
        -d "{\"clave\": \"$EMPLOYEE_ID\", \"password\": \"$EMPLOYEE_PASSWORD\"}")
    
    if echo "$response" | jq -e '.token' > /dev/null 2>&1; then
        JWT_TOKEN=$(echo "$response" | jq -r '.token')
        log "Login exitoso. Token obtenido."
        return 0
    else
        log "Error en login: $response"
        return 1
    fi
}

# Función para ejecutar curl con JWT y loggear
execute_curl() {
    local description="$1"
    local curl_cmd="$2"
    log "Ejecutando: $description"
    log "Comando: $curl_cmd"
    
    # Agregar header de autorización si hay token
    if [ -n "$JWT_TOKEN" ]; then
        curl_cmd="$curl_cmd -H 'Authorization: Bearer $JWT_TOKEN'"
    fi
    
    response=$(eval "$curl_cmd")
    status=$?
    
    if [ $status -eq 0 ]; then
        log "Respuesta exitosa (código $status)"
    else
        log "Error en la ejecución (código $status)"
    fi
    
    # Mostrar respuesta
    log "Respuesta:"
    echo "$response"
    
    echo -e "\n---\n"
}

log "=== Iniciando pruebas de endpoints CRUD de Empleados ==="
log "URL base: $BASE_URL"
log "Employee ID: $EMPLOYEE_ID"
echo

# Verificar si el servidor está corriendo
log "Verificando si el servidor está disponible..."
if curl -s --max-time 5 "$BASE_URL/swagger-ui/index.html" > /dev/null; then
    log "Servidor disponible."
else
    log "Error: Servidor no responde. Asegúrate de que la aplicación esté corriendo en Docker."
    exit 1
fi
echo

# Realizar login
if ! login; then
    log "No se pudo obtener token JWT. Abortando pruebas."
    exit 1
fi
echo

# 1. Listar empleados (GET) - debería funcionar
execute_curl "Listar empleados (GET)" "curl -s -X GET '$EMPLOYEES_URL?page=0&size=5'"

# 2. Crear empleado (POST)
execute_curl "Crear empleado (POST)" "curl -s -X POST '$EMPLOYEES_URL' -H 'Content-Type: application/json' -d '{\"clave\": \"E001\", \"nombre\": \"Juan Perez\", \"direccion\": \"Calle 123\", \"telefono\": \"555-1234\", \"password\": \"password123\"}'"

# 2.1 Listar empleados después de crear
execute_curl "Listar empleados después de crear (GET)" "curl -s -X GET '$EMPLOYEES_URL?page=0&size=5'"

# 3. Consultar empleado por clave (GET)
execute_curl "Consultar empleado por clave (GET)" "curl -s -X GET '$EMPLOYEES_URL/E001'"

# 4. Actualizar empleado (PUT)
execute_curl "Actualizar empleado (PUT)" "curl -s -X PUT '$EMPLOYEES_URL/E001' -H 'Content-Type: application/json' -d '{\"clave\": \"E001\", \"nombre\": \"Juan Perez\", \"direccion\": \"Calle 456\", \"telefono\": \"555-5678\", \"password\": \"password123\"}'"

# 4.1 Consultar empleado después de actualizar
execute_curl "Consultar empleado después de actualizar (GET)" "curl -s -X GET '$EMPLOYEES_URL/E001'"

# 5. Eliminar empleado (DELETE)
execute_curl "Eliminar empleado (DELETE)" "curl -s -X DELETE '$EMPLOYEES_URL/E001'"

# 5.1 Listar empleados después de eliminar
execute_curl "Listar empleados después de eliminar (GET)" "curl -s -X GET '$EMPLOYEES_URL?page=0&size=5'"

log "=== Fin de pruebas ==="
