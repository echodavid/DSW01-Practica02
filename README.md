# 🚀 CRUD de Empleados - Spring Boot

Un sistema completo de gestión de empleados construido con Spring Boot, PostgreSQL y Docker. Incluye API REST, autenticación básica, documentación Swagger y colección Bruno para testing.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [API Endpoints](#-api-endpoints)
- [Testing con Bruno](#-testing-con-bruno)
- [Testing con Postman](#-testing-con-postman)
- [Base de Datos](#-base-de-datos)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración](#-configuración)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- ✅ **CRUD completo** de empleados
- ✅ **API REST** con Spring Boot
- ✅ **Autenticación básica** (admin/admin123)
- ✅ **Base de datos PostgreSQL**
- ✅ **Validación de datos** con Bean Validation
- ✅ **Documentación Swagger/OpenAPI**
- ✅ **Contenedor Docker** listo para producción
- ✅ **Colección Bruno** para testing
- ✅ **Script de pruebas automatizado**
- ✅ **Paginación** en consultas
- ✅ **Manejo de errores** robusto

## 🛠 Tecnologías

- **Backend:** Spring Boot 3.2.0
- **Base de Datos:** PostgreSQL 15
- **ORM:** Hibernate/JPA
- **Seguridad:** Spring Security
- **Documentación:** OpenAPI/Swagger
- **Contenedor:** Docker & Docker Compose
- **Testing:** Bruno Collection
- **Lenguaje:** Java 17

## 📋 Requisitos Previos

- **Java 17** o superior
- **Docker** y **Docker Compose**
- **Git** (opcional, para clonar el repositorio)

## 🚀 Instalación y Ejecución

### Opción 1: Con Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/echodavid/DSW01-Practica02.git
cd DSW01-Practiva02

# Construir y ejecutar con Docker Compose
docker-compose up --build -d

# Verificar que los contenedores estén corriendo
docker ps

# La aplicación estará disponible en:
# - API: http://localhost:8080
# - Swagger UI: http://localhost:8080/swagger-ui.html
```

### Opción 2: Ejecución Local

```bash
# Clonar el repositorio
git clone https://github.com/echodavid/DSW01-Practiva02.git
cd DSW01-Practiva02

# Asegurarse de tener PostgreSQL corriendo localmente
# Configurar las credenciales en application.properties

# Ejecutar la aplicación
./mvnw spring-boot:run
# o
mvn spring-boot:run
```

### Opción 3: En GitHub Codespace

1. Ve a: `https://github.com/echodavid/DSW01-Practica02`
2. Click "Code" → "Codespaces" → "Create codespace on main"
3. Una vez abierto:
   ```bash
   docker-compose up --build -d
   ```

## 📡 API Endpoints

### Autenticación
Todos los endpoints requieren **autenticación básica HTTP**:
- **Usuario:** `admin`
- **Contraseña:** `admin123`

### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/empleados` | Listar empleados (con paginación) |
| `GET` | `/empleados/{clave}` | Consultar empleado por clave |
| `POST` | `/empleados` | Crear nuevo empleado |
| `PUT` | `/empleados/{clave}` | Actualizar empleado existente |
| `DELETE` | `/empleados/{clave}` | Eliminar empleado |

### 📝 Ejemplos de Uso

#### Crear Empleado (POST)
```bash
curl -X POST http://localhost:8080/empleados \
  -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "clave": "E001",
    "nombre": "Juan Perez",
    "direccion": "Calle 123",
    "telefono": "555-1234"
  }'
```

#### Listar Empleados (GET)
```bash
curl -X GET "http://localhost:8080/empleados?page=0&size=5" \
  -u admin:admin123
```

#### Actualizar Empleado (PUT)
```bash
curl -X PUT http://localhost:8080/empleados/E001 \
  -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "clave": "E001",
    "nombre": "Juan Perez",
    "direccion": "Calle Nueva 456",
    "telefono": "555-5678"
  }'
```

#### Eliminar Empleado (DELETE)
```bash
curl -X DELETE http://localhost:8080/empleados/E001 \
  -u admin:admin123
```

## 🧪 Testing con Bruno

Bruno es una herramienta moderna para testing de APIs. Este proyecto incluye una colección completa.

### Configuración en Bruno:

1. **Instalar Bruno** desde [bruno.app](https://www.bruno.app/)
2. **Abrir Bruno** y crear un nuevo espacio de trabajo
3. **Importar colección:**
   - Ve a `dsw02/requests/`
   - Importa todos los archivos `.yml`

### Colección Incluida:

- ✅ **Crear empleado** (`crear-empleado.yml`)
- ✅ **Listar empleados** (`listar-empleados.yml`)
- ✅ **Consultar empleado** (`consultar-empleado.yml`)
- ✅ **Actualizar empleado** (`actualizar-empleado.yml`)
- ✅ **Eliminar empleado** (`eliminar-empleado.yml`)

### Ejecutar Pruebas Automáticas:

```bash
cd dsw02
./test-empleados.sh
```

## 📮 Testing con Postman

### Configuración:

1. **Importar colección** desde `dsw02/postman_collection.json` (si existe)
2. **O crear requests manualmente**

### Configuración de Autenticación:

Para cada request, configurar **Basic Auth**:
- **Username:** `admin`
- **Password:** `admin123`

### Variables de Entorno:

Crear un environment en Postman:
```json
{
  "base_url": "http://localhost:8080",
  "username": "admin",
  "password": "admin123"
}
```

## 🗄️ Base de Datos

### Configuración PostgreSQL

```yaml
# En docker-compose.yml
db:
  image: postgres:15
  environment:
    POSTGRES_DB: postgres
    POSTGRES_USER: admin
    POSTGRES_PASSWORD: admin123
  ports:
    - "5432:5432"
```

### Esquema de la Tabla

```sql
CREATE TABLE empleados (
    clave VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(100) NOT NULL
);
```

### Conexión JPA

```properties
# En application.properties
spring.datasource.url=jdbc:postgresql://db:5432/postgres
spring.datasource.username=admin
spring.datasource.password=admin123
spring.jpa.hibernate.ddl-auto=update
```

## 📁 Estructura del Proyecto

```
DSW01-Practiva02/
├── src/main/java/com/example/empleados/
│   ├── Empleado.java                 # Entity JPA
│   ├── EmpleadoController.java       # REST Controller
│   ├── EmpleadoService.java          # Lógica de negocio
│   ├── EmpleadoRepository.java       # JPA Repository
│   ├── EmpleadosApplication.java     # Clase principal
│   └── SecurityConfig.java           # Configuración de seguridad
├── src/main/resources/
│   └── application.properties        # Configuración de la app
├── src/test/java/com/example/empleados/
│   ├── EmpleadoControllerTest.java   # Tests del controller
│   └── EmpleadoServiceTest.java      # Tests del service
├── dsw02/
│   ├── requests/                     # Colección Bruno
│   │   ├── crear-empleado.yml
│   │   ├── listar-empleados.yml
│   │   ├── consultar-empleado.yml
│   │   ├── actualizar-empleado.yml
│   │   └── eliminar-empleado.yml
│   ├── test-empleados.sh            # Script de pruebas
│   └── opencollection.yml           # Config Bruno
├── Dockerfile                        # Configuración Docker
├── docker-compose.yml               # Orquestación de contenedores
├── pom.xml                          # Dependencias Maven
└── README.md                        # Este archivo
```

## ⚙️ Configuración

### Variables de Entorno

```bash
# Base de datos
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/postgres
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=admin123

# Seguridad
SPRING_SECURITY_USER_NAME=admin
SPRING_SECURITY_USER_PASSWORD=admin123

# JPA
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=true
```

### Perfiles de Spring

- **`dev`**: Perfil de desarrollo (activo por defecto en Docker)
- **`prod`**: Perfil de producción (configurar según necesites)

## 🚢 Despliegue

### Con Docker Compose

```bash
# Construir y ejecutar
docker-compose up --build -d

# Ver logs
docker-compose logs -f app

# Detener
docker-compose down
```

### Variables de Producción

```yaml
# En docker-compose.prod.yml
environment:
  - SPRING_PROFILES_ACTIVE=prod
  - SPRING_DATASOURCE_URL=jdbc:postgresql://prod-db:5432/empleados_prod
```

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 📞 Soporte

Si tienes preguntas o problemas:

1. **Revisa** la documentación de Swagger: `http://localhost:8080/swagger-ui.html`
2. **Ejecuta** las pruebas: `./dsw02/test-empleados.sh`
3. **Revisa** los logs: `docker-compose logs app`

## 🎯 Próximos Pasos

- [ ] Agregar más campos al empleado (fecha nacimiento, email, etc.)
- [ ] Implementar búsqueda avanzada
- [ ] Agregar tests unitarios completos
- [ ] Implementar cache con Redis
- [ ] Agregar métricas con Micrometer
- [ ] Documentación de API más detallada

---

**Desarrollado con ❤️ usando Spring Boot**</content>
<parameter name="filePath">/Volumes/david/UV/Semestres/6to/Despliegue/DSW01-Practiva02/README.md