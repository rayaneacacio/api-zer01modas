const knex = require("../database/knex/index");

class CuponsController {
  async create(request, response) {
    const { cupom, discount } = request.body;

    await knex("cupons").insert({ cupom, discount });

    return response.json();
  }

  async index(request, response) {
    const cupons = await knex("cupons");
    return response.json(cupons);
  }

  async show(request, response) {
    const { name } = request.query;

    const cupom = await knex("cupons").where({ cupom: name }).first();

    return response.json(cupom);
  }

  async delete(request, response) {
    const { name, discount } = request.query;

     await knex("cupons").delete().where({ cupom: name, discount });

    return response.json();
  }
}

module.exports = CuponsController;