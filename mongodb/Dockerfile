# Use the official MongoDB image
FROM mongo:7.0

# Set the working directory
WORKDIR /docker-entrypoint-initdb.d

# Copy the initialization script into the container
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose MongoDB port
EXPOSE 27017
