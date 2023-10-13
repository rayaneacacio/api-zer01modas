const { hash } = require("bcryptjs");
const UsersRepository = require("../repositories/users-repository");
const UsersServices = require("../services/users/users-services");

class UsersController {
  async create(request, response) {
    //criar um novo usuário;
    const { name, email, password, isAdmin } = request.body;

    const usersRepository = new UsersRepository();
    const usersServices = new UsersServices(usersRepository);

    await usersServices.verifyEmail(email);

    await usersRepository.createNewUser(name, email, password, isAdmin);

    return response.json();
  }

  async index(request, response) {
    //listar todos os usuários;
    const usersRepository = new UsersRepository();
    const users = await usersRepository.allUsers();

    return response.json(users);
  }

  async show(request, response) {
    //buscar um usuário;
    const { id, email } = request.body;
    
    const usersRepository = new UsersRepository();
    let user = null;

    if(id) {
      user = await usersRepository.findById(id);
    } else if(email) {
      user = await usersRepository.findByEmail(email);
    }

    return response.json(user);
  }

  async update(request, response) {
    //atualizar um usuário;
    //buscar pelo token;
    const { id } = request.query;
    const { oldPassword, name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const usersServices = new UsersServices(usersRepository);

    const user = await usersRepository.findById(Number(id));
    await usersServices.verifyPassowrd({ password: oldPassword, userPassword: user.password });

    const newName = name ?? user.name;
    const newEmail = email ?? user.email;
    const newPassword = password ? await hash(password, 10) : user.password;

    await usersRepository.updateUser(newName, newEmail, newPassword, id);

    return response.json();
  }

  async delete(request, response) {
    //deletar um usuário;
    const { id } = request.query;
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