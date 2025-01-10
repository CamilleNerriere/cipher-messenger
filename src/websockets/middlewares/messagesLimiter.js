const messageCount = {};
const messageLimit = 100;
const timeWindow = 15 * 60 * 1000;

const messageLimiter = (ws, req) => {
  const ip = req.socket.remoteAddress; // Obtenir l'adresse IP du WebSocket

  if (!messageCount[ip]) {
    messageCount[ip] = { count: 0, timestamp: Date.now() };
  }

  const currentTime = Date.now();

  // Réinitialiser le compteur si la fenêtre de temps est écoulée
  if (currentTime - messageCount[ip].timestamp > timeWindow) {
    messageCount[ip].count = 0;
    messageCount[ip].timestamp = currentTime;
  }

  ws.on("close", () => {
    delete messageCount[ip];
  });

  return () => {
    if (messageCount[ip].count >= messageLimit) {
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Message limit reached. Please wait.",
        })
      );
      return false; // Indique que le message ne peut pas être envoyé
    }

    messageCount[ip].count++;
    return true; // Indiquer que le message peut être envoyé
  };
};

export default messageLimiter;
