const UsersRepository = require("../repositories/users-repository");
const UsersServices = require("../services/users/users-services");

class UsersController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const usersRepository = new UsersRepository();
    const usersServices = new UsersServices(usersRepository);

    await usersServices.verifyEmail(email);

    await usersRepository.createNewUser(name, email, password, isAdmin);

    return response.json();
  }

  async index(request, response) {
    const usersRepository = new UsersRepository();
    const users = await usersRepository.allUsers();

    return response.json(users);
  }

  async show(request, response) {
    const { id } = request.user;
    
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    return response.json(user);
  }

  async update(request, response) {
    const { id } = request.user;
    const { oldPassword, name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const usersServices = new UsersServices(usersRepository);

    const user = await usersRepository.findById(Number(id));
    await usersServices.verifyPassowrd({ password: oldPassword, userPassword: user.password });

    await usersRepository.updateUser(user, name, email, password);

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.user;
    const { password } = request.body;

    const usersRepository = new UsersRepository();
    const usersServices = new UsersServices(usersRepository);

    const user = await usersRepository.findById(Number(id));

    await usersServices.verifyPassowrd({ password, userPassword: user.password });

    await usersRepository.deleteById(Number(id));

    return response.json();
  }
}

module.exports = UsersController;