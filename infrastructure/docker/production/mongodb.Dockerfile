FROM mongo:latest

# Copy initialization script
COPY infrastructure/docker/mongodb/init.js /docker-entrypoint-initdb.d/

# Expose MongoDB port
EXPOSE 27017

# Use the default entrypoint from the mongo image 