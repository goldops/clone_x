FROM node:18

# Créer le répertoire /app
RUN mkdir /app

# Copier tous les fichiers du dossier vers le dossier /app de l'image
COPY . /app
WORKDIR /app

# Installation des dépendances
RUN npm i

# Build du projet
RUN npm run build

# On expose le port 3000 sur lequel sera exécuté le serveur frontend
EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]