# Colección Bruno - API Empleados

Esta colección contiene todas las pruebas para la API de empleados con autenticación JWT.

## 🚀 Inicio Rápido

1. **Iniciar la aplicación:**
   ```bash
   docker-compose up --build -d
   ```

2. **Ejecutar pruebas automatizadas:**
   ```bash
   ./test-empleados.sh
   ```

## 📋 Endpoints Disponibles

### 🔐 Autenticación
- **POST** `/v1/auth/login` - Login con clave y contraseña

### 👥 Empleados
- **GET** `/v1/empleados` - Listar empleados (con paginación)
- **GET** `/v1/empleados/{clave}` - Consultar empleado específico
- **POST** `/v1/empleados` - Crear nuevo empleado
- **PUT** `/v1/empleados/{clave}` - Actualizar empleado
- **DELETE** `/v1/empleados/{clave}` - Eliminar empleado

## 🔧 Configuración en Bruno

### Variables de Entorno
- `{{jwt_token}}` - Token JWT obtenido del login (se configura automáticamente)

### Autenticación
- Tipo: **Bearer Token**
- Token: `{{jwt_token}}`

### Headers Requeridos
- `Authorization: Bearer {{jwt_token}}` (para endpoints protegidos)
- `Content-Type: application/json` (para POST/PUT)

## 📝 Notas Importantes

- **Contraseñas hasheadas**: Las contraseñas se cifran automáticamente con BCrypt
- **API Versionada**: Todos los endpoints usan `/v1/`
- **Paginación**: El listado soporta `?page=0&size=5`
- **Campos requeridos**: `clave`, `nombre`, `direccion`, `telefono`, `password`

## 🧪 Flujo de Pruebas

1. **Login** → Obtiene token JWT
2. **Crear empleado** → POST con datos del empleado
3. **Listar empleados** → GET con paginación
4. **Consultar específico** → GET por clave
5. **Actualizar empleado** → PUT con datos modificados
6. **Eliminar empleado** → DELETE por clave

## 📊 Credenciales de Prueba

- **Admin**: `clave: "1"`, `password: "admin123"`
- **Empleado de prueba**: `clave: "E001"`, `password: "password123"`

## 🐛 Solución de Problemas

- **Token expirado**: Ejecutar login nuevamente
- **Error 403**: Verificar que el token JWT sea válido
- **Error 401**: Credenciales incorrectas en login</content>
<parameter name="filePath">/Volumes/david/UV/Semestres/6to/Despliegue/DSW01-Practiva02/dsw02/README.md