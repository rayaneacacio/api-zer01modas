const AppError = require("../../utils/AppError");
const { compare } = require("bcryptjs");

class UsersServices {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async verifyEmail(email) {
    const users = await this.usersRepository.allUsers();

    try {
      await Promise.all(users.map(async (user) => {
        const checkEmail = await compare(email, user.email);

        if(checkEmail) {
          throw error;
        }
      }));

    } catch {
      throw new AppError("O email já existe");
    }

  }

  async verifyPassowrd({ password, userPassword }) {
    const checkPassowrd = await compare(password, userPassword);
    if(!checkPassowrd) {
      throw new AppError("E-mail ou senha incorreta");
    }
  }
}

module.exports = UsersServices;