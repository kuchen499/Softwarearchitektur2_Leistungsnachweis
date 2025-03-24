FROM maven:3.9.9-ibm-semeru-17-focal
WORKDIR /app
# Kopiere die Maven-Konfigurationsdatei
COPY pom.xml .
# Kopiere den gesamten src-Ordner (inklusive src/main/java und src/main/resources)
COPY src ./src
# Baue das Projekt und überspringe die Tests
RUN mvn clean package -DskipTests
# Exponiere den Port, auf dem deine Anwendung läuft (hier 8080)
EXPOSE 8080
# Starte die Anwendung. Passe den Pfad und den Dateinamen an, falls nötig.
CMD ["java", "-jar", "target/freizeitpark-0.0.1-SNAPSHOT.jar"]

