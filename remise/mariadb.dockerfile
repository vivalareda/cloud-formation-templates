FROM mariadb:10.5

# Configuration du port non standard (3360)
RUN echo "[mysqld]" >> /etc/mysql/my.cnf && \
    echo "port=3360" >> /etc/mysql/my.cnf

# Création de la base de données "Pizzas" utilisée par MenuGraphique
ENV MYSQL_DATABASE=Pizzas

# Variables d'environnement qui seront remplacées au démarrage du conteneur
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_ROOT_PASSWORD=root_password

# Exposition du port configuré
EXPOSE 3360