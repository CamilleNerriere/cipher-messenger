import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 messages par utilisateur par fenêtre
  message: "Trop de messages envoyés, veuillez réessayer plus tard.",
  standardHeaders: true, // Retourne la limite par défaut dans les headers
  legacyHeaders: false, // désactive le X-RateLimite dans les headers
});

export default limiter;
