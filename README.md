Procédure pour activer l'authentification : 

* Créer d'abord le service sans authentification dans le docker-compose 

ex : 

version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    command: ["mongod"]  # Démarrer sans authentification

volumes:
  mongo-data:

     
* puis lancer les containers : 

docker-compose up -d

* et entrer : 

docker exec -it nom-du-container mongo

* Créer une base de données : 

ex : 

use nouvelle-base-de-données;  

db.createUser({
  user: "dbUser",
  pwd: "dbPassword",  
  roles: [{ role: "readWrite", db: "nouvelle-base-de-données" }]
});

* exit

* on modifie le docker compose de manière à ajouter l'authentification 

version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=dbUser 
      - MONGO_INITDB_ROOT_PASSWORD=dbPassword  
    command: ["mongod", "--auth"]  # Démarrer avec authentification activée

volumes:
  mongo-data:

et on passe à l'image node l'URI suivante : 

MONGO_URI=mongodb://dbUser:dbPassword@mongodb:27017/nouvelle-base-de-données?authSource=nouvelle-base-de-données


* on refait : 

docker compose up 