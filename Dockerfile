# Etapa 1: Build - Compilación de la aplicación
FROM amazoncorretto:17-alpine AS builder
WORKDIR /app

# Copiar archivos de configuración de Maven
COPY pom.xml .

# Copiar código fuente
COPY src ./src

# Compilar la aplicación (saltando tests para optimizar)
RUN apk add --no-cache maven && \
    mvn clean package -Dmaven.test.skip=true && \
    apk del maven

# Etapa 2: Runtime - Imagen optimizada para ejecución
FROM amazoncorretto:17-alpine
WORKDIR /app

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copiar el JAR compilado desde la etapa de build
COPY --from=builder /app/target/empleados-0.0.1-SNAPSHOT.jar app.jar

# Cambiar propietario de los archivos
RUN chown -R appuser:appgroup /app

# Cambiar a usuario no-root
USER appuser

# Exponer puerto
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# Ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]