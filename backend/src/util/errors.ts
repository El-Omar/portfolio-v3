export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Welp, resource not found") {
    super(404, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request, very bad", statusCode = 400) {
    super(statusCode, message);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required, hacker!") {
    super(401, message);
  }
}

export class InvalidCredentialsError extends AuthenticationError {
  constructor(message = "Invalid credentials, who are you?") {
    super(message);
  }
}

export class TokenExpiredError extends AuthenticationError {
  constructor(message = "Token has expired, means you need to re-loggin") {
    super(message);
  }
}
