class AppError {
  //classe para criar um objeto com mensagem de erro e codigo de status HTTP;
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;