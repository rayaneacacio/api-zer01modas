const knex = require("../database/knex/index");
const { hash, compare } = require("bcryptjs");

class UsersRepository {
  async findByEmail(email) {
    return await knex("users").where({ email }).first();
  }

  async findById(id) {
    return await knex("users").where({ id }).first();
  }

  async createNewUser(name, email, password, isAdmin) {
    const hashedPassword = await hash(password, 10);

    await knex("users").insert({ name, email, password: hashedPassword });

    if(isAdmin) {
      await knex("users").update({ isAdmin }).where({ email: hashedEmail });
    }
  }

  async allUsers() {
    return await knex("users");
  }

  async updateUser(user, name, email, password) {
    const newName = name ?? user.name;
    const newEmail = email ?? user.email;
    const newPassword = password ? await hash(password, 10) : user.password;

    await knex("users").update({ name: newName, email: newEmail, password: newPassword }).where({ id: user.id });
  }

  async deleteById(id) {
    await knex("users").where({ id }).delete();
  }
}

module.exports = UsersRepository;