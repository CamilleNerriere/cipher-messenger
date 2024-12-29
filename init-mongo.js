import dotenv from "dotenv";
dotenv.config();

db = db.getSiblingDB("ciphermessenger");

// Ajouter un utilisateur pour le développement avec des permissions limitées
db.createUser({
  user: process.env.DEV_USER,
  pwd: process.env.DEV_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: "ciphermessenger",
    },
  ],
});

// (Optionnel) Ajouter des données initiales ou configurer la base si nécessaire
db.testCollection.insertMany([
  { name: "Test User 1", email: "test1@example.com" },
  { name: "Test User 2", email: "test2@example.com" },
]);
