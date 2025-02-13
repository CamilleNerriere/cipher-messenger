db = db.getSiblingDB('ciphermessenger');

db.createUser({
  user: 'cipherUser',
  pwd: 'securePassword',
  roles: [
    {
      role: 'readWrite',
      db: 'ciphermessenger',
    },
  ],
});
