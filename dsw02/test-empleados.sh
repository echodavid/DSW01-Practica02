#!/bin/bash

# Variables
USER="admin"
PASS="admin123"
BASE_URL="https://musical-happiness-69g999qwxrpphrj64-8080.app.github.dev/empleados"

# Función para log con timestamp
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Función para ejecutar curl y loggear
execute_curl() {
    local description="$1"
    local curl_cmd="$2"
    log "Ejecutando: $description"
    log "Comando: $curl_cmd"
    response=$(eval "$curl_cmd")
    status=$?
    if [ $status -eq 0 ]; then
        log "Respuesta exitosa (código $status)"
    else
        log "Error en la ejecución (código $status)"
    fi
    
    # Extraer código HTTP
    http_status=$(echo "$response" | grep "HTTP Status:" | awk '{print $3}')
    log "Código HTTP: $http_status"
    
    # Extraer cuerpo de la respuesta
    body=$(echo "$response" | sed '/HTTP Status:/d')
    log "Cuerpo de respuesta:"
    echo "$body"
    
    # Verificar si es exitoso
    if [[ $http_status -ge 200 && $http_status -lt 300 ]]; then
        log "Resultado: ÉXITO"
    else
        log "Resultado: ERROR"
    fi
    
    echo -e "\n---\n"
}

log "=== Iniciando pruebas de endpoints CRUD de Empleados ==="
log "Usuario: $USER"
log "URL base: $BASE_URL"
echo

# Verificar si el servidor está corriendo
log "Verificando si el servidor está disponible..."
if curl -s --max-time 5 "$BASE_URL" > /dev/null; then
    log "Servidor disponible."
else
    log "Advertencia: Servidor no responde. Asegúrate de que la aplicación esté corriendo."
fi
echo

# 1. Listar empleados (GET) - debería funcionar
execute_curl "Listar empleados (GET)" "curl -u '$USER:$PASS' -X GET '$BASE_URL?page=0&size=5' -w '\nHTTP Status: %{http_code}\n'"

# 2. Crear empleado (POST)
execute_curl "Crear empleado (POST)" "curl -u '$USER:$PASS' -X POST '$BASE_URL' -H 'Content-Type: application/json' -d '{\"clave\": \"E001\", \"nombre\": \"Juan Perez\", \"direccion\": \"Calle 123\", \"telefono\": \"555-1234\"}' -w '\nHTTP Status: %{http_code}\n'"

# 2.1 Listar empleados después de crear
execute_curl "Listar empleados después de crear (GET)" "curl -u '$USER:$PASS' -X GET '$BASE_URL?page=0&size=5' -w '\nHTTP Status: %{http_code}\n'"

# 3. Consultar empleado por clave (GET)
execute_curl "Consultar empleado por clave (GET)" "curl -u '$USER:$PASS' -X GET '$BASE_URL/E001' -w '\nHTTP Status: %{http_code}\n'"

# 4. Actualizar empleado (PUT)
execute_curl "Actualizar empleado (PUT)" "curl -u '$USER:$PASS' -X PUT '$BASE_URL/E001' -H 'Content-Type: application/json' -d '{\"clave\": \"E001\", \"nombre\": \"Juan Perez\", \"direccion\": \"Calle 456\", \"telefono\": \"555-5678\"}' -w '\nHTTP Status: %{http_code}\n'"

# 4.1 Consultar empleado después de actualizar
execute_curl "Consultar empleado después de actualizar (GET)" "curl -u '$USER:$PASS' -X GET '$BASE_URL/E001' -w '\nHTTP Status: %{http_code}\n'"

# 5. Eliminar empleado (DELETE)
execute_curl "Eliminar empleado (DELETE)" "curl -u '$USER:$PASS' -X DELETE '$BASE_URL/E001' -w '\nHTTP Status: %{http_code}\n'"

# 5.1 Listar empleados después de eliminar
execute_curl "Listar empleados después de eliminar (GET)" "curl -u '$USER:$PASS' -X GET '$BASE_URL?page=0&size=5' -w '\nHTTP Status: %{http_code}\n'"

log "=== Fin de pruebas ==="
