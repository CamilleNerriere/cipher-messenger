A small project in order to learn Websocket and Ws and play with a small Ceasar Cipher. Front is still in development

------

In order to create another user for mongo, with less permissions, create an init-mongo.js with : 

````
db = db.getSiblingDB('db-name');

db.createUser({
  user: 'dbUser',
  pwd: 'securePassword',
  roles: [
    {
      role: 'readWrite',
      db: 'db-name',
    },
  ],
});

````