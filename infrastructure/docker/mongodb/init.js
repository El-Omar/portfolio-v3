print("MongoDB initialization starting...");

db = db.getSiblingDB("admin");

db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [{ role: "root", db: "admin" }],
});

print("Admin user created successfully");

db.auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

db = db.getSiblingDB(process.env.MONGODB_DATABASE || "portfolio");

print("Creating collections...");
db.createCollection("projects");
db.createCollection("blogs");

print("Creating indexes...");
db.projects.createIndex({ slug: 1 }, { unique: true });
db.projects.createIndex({ featured: 1, order: 1 });
db.blogs.createIndex({ slug: 1 }, { unique: true });

print("MongoDB initialization completed successfully");
