print("MongoDB initialization starting...");

// Create admin user if it doesn't exist
db = db.getSiblingDB("admin");
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME || "root",
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD || "example",
  roles: [{ role: "root", db: "admin" }]
});

// Switch to the application database
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || "portfolio");

print("Creating collections...");
db.createCollection("projects");
db.createCollection("blogs");

print("Creating indexes...");
db.projects.createIndex({ slug: 1 }, { unique: true });
db.projects.createIndex({ featured: 1, order: 1 });
db.blogs.createIndex({ slug: 1 }, { unique: true });

print("MongoDB initialization completed successfully");