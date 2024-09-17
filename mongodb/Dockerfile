FROM mongo:7.0
WORKDIR /docker-entrypoint-initdb.d
COPY init-mongo.js /docker-entrypoint-initdb.d/
EXPOSE 27017
