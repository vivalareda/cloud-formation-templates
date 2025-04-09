FROM mariadb:latest

# Configurer le port 3360
RUN echo "[mysqld]" > /etc/mysql/conf.d/custom.cnf && \
    echo "port=3360" >> /etc/mysql/conf.d/custom.cnf

# Variables d'environnement pour la configuration
ENV MYSQL_DATABASE=Pizzas
ENV MYSQL_ROOT_HOST=%

# Port exposé
EXPOSE 3360
