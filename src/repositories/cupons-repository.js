const knex = require("../database/knex/index");

class CuponsRepository {
  async create(cupom, discount) {
    await knex("cupons").insert({ cupom, discount });
  }

  async allCupons() {
    return await knex("cupons");
  }

  async findCupom(name) {
    return await knex("cupons").where({ cupom: name }).first();
  }

  async delete(name, discount) {
    await knex("cupons").delete().where({ cupom: name, discount });
  }
}

module.exports = CuponsRepository;