const knex = require("../database/knex/index");
const { hash } = require("bcryptjs");

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
      await knex("users").update({ isAdmin }).where({ email });
    }
  }

  async allUsers() {
    return await knex("users");
  }

  async updateUser(newName, newEmail, newPassword, id) {
    await knex("users").update({ name: newName, email: newEmail, password: newPassword }).where({ id: Number(id) });
  }

  async deleteById(id) {
    await knex("users").where({ id }).delete();
  }
}

module.exports = UsersRepository;