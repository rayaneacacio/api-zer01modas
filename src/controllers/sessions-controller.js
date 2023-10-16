const UsersRepository = require("../repositories/users-repository");
const UsersServices = require("../services/users/users-services");
const SessionsRepository = require("../repositories/sessions-repository");
const SessionsServices = require("../services/sessions/sessions-services");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const usersServices = new UsersServices(usersRepository);

    const sessionsRepository = new SessionsRepository();
    const sessionsServices = new SessionsServices(sessionsRepository);

    const user = await usersRepository.findByEmail(email);

    await sessionsServices.verifyUserExists(user);
    await usersServices.verifyPassowrd({ password, userPassword: user.password });

    const token = sessionsRepository.createToken(user);

    return response.json({ user, token });
  }  
}

module.exports = SessionsController;