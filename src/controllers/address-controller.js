const knex = require("../database/knex/index");

class AddressController {
  async create(request, response) {
    const user_id = request.user.id;
    const { destinatário, cep, rua, numero, complemento, bairro, cidade, estado, ponto_de_referencia } = request.body;

    const [ id ] = await knex("address").insert({ user_id, destinatário, cep, rua, numero, bairro, cidade, estado });

    if(complemento) {
      await knex("address").update({ complemento }).where({ id });
    }

    if(ponto_de_referencia) {
      await knex("address").update({ ponto_de_referencia }).where({ id });
    }

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const userAddresses = await knex("address").where({ user_id });

    return response.json(userAddresses);
  }

  async update(request, response) {
    const { id, destinatário, cep, rua, numero, complemento, bairro, cidade, estado, ponto_de_referencia } = request.body;

    const address = await knex("address").where({ id });

    const newDestinatario = destinatário ?? address.destinatário;
    const newCEP = cep ?? address.cep;
    const newRua = rua ?? address.rua;
    const newNumero = numero ?? address.numero;
    const newComplemento = complemento ?? address.complemento;
    const newBairro = bairro ?? address.bairro;
    const newCidade = cidade ?? address.cidade;
    const newEstado = estado ?? address.estado;
    const newPontoDeReferencia = ponto_de_referencia ?? address.ponto_de_referencia;

    await knex("address").update({ destinatário: newDestinatario, cep: newCEP, rua: newRua, numero: newNumero, complemento: newComplemento, bairro: newBairro, cidade: newCidade, estado: newEstado, ponto_de_referencia: newPontoDeReferencia }).where({ id });

    return response.json();
  }

  async delete(request, response) {
    const arrayId = request.body.id;

    arrayId.map(async (id) => {
      await knex("address").delete().where({ id });
    });

    return response.json();
  }
}

module.exports = AddressController;