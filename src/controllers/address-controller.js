const AddressRepository = require("../repositories/address-repository");

class AddressController {
  async create(request, response) {
    const user_id = request.user.id;
    const { destinatário, cep, rua, numero, complemento, bairro, cidade, estado, ponto_de_referencia } = request.body;
    const addressRepository = new AddressRepository();

    const id = await addressRepository.create(user_id, destinatário, cep, rua, numero, bairro, cidade, estado);

    if(complemento) {
      await addressRepository.updatComplemento(id, complemento);
    }

    if(ponto_de_referencia) {
      await addressRepository.updatePontoDeReferencia(id, ponto_de_referencia);
    }

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;
    const addressRepository = new AddressRepository();

    const userAddresses = await addressRepository.addressesOfUser(user_id);

    return response.json(userAddresses);
  }

  async update(request, response) {
    const { id, destinatário, cep, rua, numero, complemento, bairro, cidade, estado, ponto_de_referencia } = request.body;
    const addressRepository = new AddressRepository();

    await addressRepository.update(id, destinatário, cep, rua, numero, complemento, bairro, cidade, estado, ponto_de_referencia);

    return response.json();
  }

  async delete(request, response) {
    const arrayId = request.body.id;
    const addressRepository = new AddressRepository();

    arrayId.map(async (id) => {
      await addressRepository.delete(id);
    });

    return response.json();
  }
}

module.exports = AddressController;