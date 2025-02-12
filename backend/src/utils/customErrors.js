export class AuthorizationError extends Error {
  constructor(error, message = "Accès refusé.") {
    super(message);
    this.error = error;
    this.statusCode = 403;
    Error.captureStackTrace(this, AuthorizationError);
  }
}

export class AuthentificationError extends Error {
  constructor(message = "Email ou mot de passe incorrect.", error = null) {
    super(message);
    this.name = "AuthentificationError";
    this.error = error;
    this.statusCode = 401;
    Error.captureStackTrace(this, AuthentificationError);
  }
}

export class ServerError extends Error {
  constructor(
    error,
    name = "Server Error",
    message = "Une erreur est survenue. Veuillez réessayer plus tard.",
    statusCode = 500
  ) {
    super(message);
    this.error = error;
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, ServerError);
  }
}

export class NotFoundError extends Error {
  constructor(message = "Ressource non trouvée", statusCode = 404, error) {
    super(message);
    this.name = "Not Found";
    this.error = error;
    this.statusCode = statusCode;
  }
}
