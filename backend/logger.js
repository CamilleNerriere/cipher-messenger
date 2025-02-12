import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info", // Niveau de log configurable
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Format JSON adapté aux outils d'analyse
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }), // Logs des erreurs
    new winston.transports.File({ filename: "combined.log" }), // Tous les logs
  ],
});

// En développement, ajoutez les logs dans la console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(), // Format lisible pour la console
    })
  );
}

export default logger;
