const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsRepository {
  createToken(user) {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    return token;
  }
}

module.exports = SessionsRepository;