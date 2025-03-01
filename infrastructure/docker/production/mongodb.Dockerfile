FROM mongo:latest

# Set environment variables for initialization
# ENV MONGO_INITDB_ROOT_USERNAME=root
# ENV MONGO_INITDB_ROOT_PASSWORD=example
# ENV MONGO_INITDB_DATABASE=portfolio

# Create a custom MongoDB configuration file
# RUN echo "security:\n  authorization: enabled" > /etc/mongod.conf.d/security.conf

# Copy initialization script
COPY infrastructure/docker/mongodb/init.js /docker-entrypoint-initdb.d/

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB with authentication enabled
CMD ["mongod", "--bind_ip_all"] 