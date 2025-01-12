A small project in order to learn Websocket and Ws and play with a small Ceasar Cipher. 

------

# Procedure to Enable Authentication

1. **First, create the service without authentication in the `docker-compose` file:**

   ```yaml
   version: '3.8'
   services:
     mongodb:
       image: mongo:latest
       container_name: mongodb
       ports:
         - "27017:27017"
       volumes:
         - mongo-data:/data/db
       command: ["mongod"]  # Start without authentication

   volumes:
     mongo-data:
   ```

2. **Then start the containers:**

   ```bash
   docker-compose up -d
   ```

3. **Access the container:**

   ```bash
   docker exec -it container-name mongo
   ```

4. **Create a database:**

   Example:
   ```javascript
   use new-database;

   db.createUser({
     user: "dbUser",
     pwd: "dbPassword",
     roles: [{ role: "readWrite", db: "new-database" }]
   });
   ```

5. **Exit the Mongo shell:**

   ```bash
   exit
   ```

6. **Modify the `docker-compose` file to enable authentication:**

   ```yaml
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
       command: ["mongod", "--auth"]  # Start with authentication enabled

   volumes:
     mongo-data:
   ```

7. **Pass the following URI to the Node.js application:**

   ```plaintext
   MONGO_URI=mongodb://dbUser:dbPassword@mongodb:27017/new-database?authSource=new-database
   ```

8. **Rebuild and start the containers:**

   ```bash
   docker-compose up
   ```

   ---------


# Procédure pour activer l'authentification

1. **Créer d'abord le service sans authentification dans le fichier `docker-compose` :**

   ```yaml
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
   ```

2. **Lancer les containers :**

   ```bash
   docker-compose up -d
   ```

3. **Accéder au container :**

   ```bash
   docker exec -it nom-du-container mongo
   ```

4. **Créer une base de données :**

   Exemple :
   ```javascript
   use nouvelle-base-de-données;

   db.createUser({
     user: "dbUser",
     pwd: "dbPassword",
     roles: [{ role: "readWrite", db: "nouvelle-base-de-données" }]
   });
   ```

5. **Quitter le shell Mongo :**

   ```bash
   exit
   ```

6. **Modifier le fichier `docker-compose` pour activer l'authentification :**

   ```yaml
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
   ```

7. **Passer l'URI suivant à l'application Node.js :**

   ```plaintext
   MONGO_URI=mongodb://dbUser:dbPassword@mongodb:27017/nouvelle-base-de-données?authSource=nouvelle-base-de-données
   ```

8. **Rebuild et démarrer les containers :**

   ```bash
   docker-compose up
   ```