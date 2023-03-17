class ErrorClient extends Error {
  constructor(statusCode, message) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ErrorClient;