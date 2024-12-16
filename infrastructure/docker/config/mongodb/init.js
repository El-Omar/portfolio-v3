db = db.getSiblingDB("admin");
db.auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

db = db.getSiblingDB(process.env.MONGODB_DATABASE);

// Creating the collections that I have
db.createCollection("projects");
db.createCollection("blogs");

// Create indexes
db.projects.createIndex({ slug: 1 }, { unique: true });

db.projects.createIndex({ featured: 1, order: 1 });