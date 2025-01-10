const connectionCount = {}; // Pour suivre les connexions par IP

const websocketLimiter = (maxConnections) => {
  return (ws, req, next) => {
    const ip = req.socket.remoteAddress;

    // Initialiser le compteur pour cette IP si nécessaire
    if (!connectionCount[ip]) {
      connectionCount[ip] = 0;
    }

    // Vérifier si la limite est atteinte
    if (connectionCount[ip] >= maxConnections) {
      ws.close(1000, "Connection limit reached");
      return;
    }

    connectionCount[ip]++;

    // Décrémenter le compteur à la fermeture de la connexion
    ws.on("close", () => {
      connectionCount[ip]--;
      if (connectionCount[ip] === 0) {
        delete connectionCount[ip];
      }
    });

    next();
  };
};

export default websocketLimiter;
