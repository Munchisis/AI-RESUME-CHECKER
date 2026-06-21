class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
    this.isOperational = true; // Mark as operational error
    Error.captureStackTrace(this, this.constructor);
  }
  static badRequest(message, details) {
    return new ApiError(400, message, details);
  }
  static unauthorized(message = "unauthorized") {
    return new ApiError(401, message);
  }
  static forbidden(message = "forbidden") {
    return new ApiError(403, message);
  }
  static notFound(message = "not found") {
    return new ApiError(404, message);
  }
  static conflict(message = "conflict", details) {
    return new ApiError(409, message, details);
  }
  static tooManyRequests(message = "too many requests") {
    return new ApiError(429, message);
  }
  static internal(message = "internal server error") {
    return new ApiError(500, message);
  } 
}

module.exports = ApiError;