FROM mariadb:latest

# Configurer le port 3360
RUN echo "[mysqld]" > /etc/mysql/conf.d/custom.cnf && \
    echo "port=3360" >> /etc/mysql/conf.d/custom.cnf

# Variables d'environnement pour la configuration
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=password
ENV MYSQL_DATABASE=Pizzas

# Port exposé
EXPOSE 3360
