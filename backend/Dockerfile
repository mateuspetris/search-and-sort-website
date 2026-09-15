# Imagem usada pelo Railway: com um Dockerfile na pasta, o Railway o usa no lugar da detecção automática,
# o que garante Java 21 independentemente da versão padrão da plataforma.

# 1) Build: compila e empacota o jar com o Maven Wrapper do projeto.
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw -q -B dependency:go-offline

COPY src src
RUN ./mvnw -q -B -DskipTests package && cp target/*.jar app.jar

# 2) Execução: só o JRE e o jar.
FROM eclipse-temurin:21-jre
WORKDIR /app

RUN useradd --system --uid 1001 spring
USER spring

COPY --from=build /app/app.jar app.jar

# Usa até 75% da memória do contêiner para o heap. A porta vem da variável PORT (ver application.properties).
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
