const AppError = require("../../utils/AppError");

class SessionsServices {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository;
  }

  async verifyUserExists(user) {
    if(!user) {
      throw new AppError("E-mail ou senha incorreta");
    }
  }
}

module.exports = SessionsServices;