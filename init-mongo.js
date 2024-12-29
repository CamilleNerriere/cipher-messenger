db = db.getSiblingDB("ciphermessenger");

// Ajouter des données initiales
db.users.insertMany([
  { username: "Test User 1", email: "test1@example.com", password: "1234" },
  { username: "Test User 2", email: "test2@example.com", password: "1234" },
]);
