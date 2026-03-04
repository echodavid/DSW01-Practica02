FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN apk add --no-cache maven && mvn clean package -Dmaven.test.skip=true
EXPOSE 8080
CMD ["java", "-jar", "target/empleados-0.0.1-SNAPSHOT.jar"]