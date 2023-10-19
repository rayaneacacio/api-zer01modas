const AppError = require("../../utils/AppError");

class SessionsServices {
  async verifyUserExists(user) {
    if(!user) {
      throw new AppError("E-mail ou senha incorreta");
    }
  }
}

module.exports = SessionsServices;