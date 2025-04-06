FROM alpine:latest

# Installation des dépendances
RUN apk update && \
    apk add --no-cache nodejs npm aws-cli

# Création du répertoire de l'application
WORKDIR /app

# Téléchargement des fichiers depuis S3
RUN aws s3 cp s3://menugraphique-2025-h24-jp/service-license/ . --recursive

# Installation des dépendances Node.js
RUN npm install

# Génération des clés
RUN node generate.js

# Exposition du port utilisé par l'application
EXPOSE 9090

# Démarrage du serveur sur le port 9090
CMD ["node", "index.js", "9090"]