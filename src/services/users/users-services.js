const AppError = require("../../utils/AppError");
const { compare } = require("bcryptjs");

class UsersServices {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async verifyEmail(email) {
    const user = await this.usersRepository.findByEmail(email);

    if(user) {
      throw new AppError("O email já existe");
    }

    return user;
  }

  async verifyPassowrd({ password, userPassword }) {
    const checkPassowrd = await compare(password, userPassword);
    if(!checkPassowrd) {
      throw new AppError("E-mail ou senha incorreta");
    }
  }
}

module.exports = UsersServices;