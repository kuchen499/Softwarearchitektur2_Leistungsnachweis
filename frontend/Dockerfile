# Verwende ein Node-Image als Basis
FROM node:16-alpine

# Arbeitsverzeichnis festlegen
WORKDIR /app

# Kopiere package.json (und package-lock.json, falls vorhanden)
COPY package.json package-lock.json* ./

# Installiere Abhängigkeiten
RUN npm install

# Kopiere den Rest des Quellcodes
COPY . .

# Baue die App (z. B. für ein React-Projekt)
RUN npm run build

# Exponiere den Port, auf dem die App laufen soll
EXPOSE 3000

# Starte einen einfachen statischen File-Server (hier verwenden wir "serve")
# Stelle sicher, dass "serve" als Abhängigkeit (dev oder global) in deinem package.json enthalten ist
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
