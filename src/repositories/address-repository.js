const knex = require("../database/knex/index");

class AddressRepository {
  async create(user_id, destinatário, cep, rua, numero, bairro, cidade, estado) {
    const [ id ] = await knex("address").insert({ user_id, destinatário, cep, rua, numero, bairro, cidade, estado });
    
    return id;
  }

  async updatComplemento(id, complemento) {
    await knex("address").update({ complemento }).where({ id });
  }

  async updatePontoDeReferencia(id, ponto_de_referencia) {
    await knex("address").update({ ponto_de_referencia }).where({ id });
  }

  async addressesOfUser(user_id) {
    return await knex("address").where({ user_id });
  }

  async update(id, destinatário, cep, rua, numero, complemento, bairro, cidade, estado, ponto_de_referencia) {
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
  }

  async delete(id) {
    await knex("address").delete().where({ id });
  }
}

module.exports = AddressRepository;