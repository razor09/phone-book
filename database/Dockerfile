FROM mysql:5.7

ENV MYSQL_HOST localhost
ENV MYSQL_ROOT_PASSWORD mysql
ENV MYSQL_PASSWORD mysql
ENV MYSQL_DATABASE schema

ADD schema.sql /docker-entrypoint-initdb.d