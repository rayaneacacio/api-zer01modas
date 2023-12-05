const { consultarCep, calcularPrecoPrazo } = require("correios-brasil");
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

  async show(request, response) {
    //buscar endereco pelo cep;
    const { cep } = request.query;

    try {
      const cepBrasil = await consultarCep(cep);

      return response.json(cepBrasil);
    } catch(error) {
      response.status(500).json({ error: error.toString() });
    }
  }

  async showFrete(request, response) {
    //consultar preco e prazo de entrega de uma encomenda;
    const { cep } = request.query;

    try {
      let args = {
        sCepOrigem: '62640000',
        sCepDestino: cep,
        nVlPeso: '1',
        nCdFormato: '1',
        nVlComprimento: '20',
        nVlAltura: '20',
        nVlLargura: '20',
        nCdServico: ['04014', '04510'],
        nVlDiametro: '0',
      };

      const info_encomenda = await calcularPrecoPrazo(args);

      return response.json(info_encomenda);

    } catch(error) {
      response.status(500).json({ error: error.toString() });
    }
  }

  async delete(request, response) {
    const { id } = request.query;
    const addressRepository = new AddressRepository();

    await addressRepository.delete(id);

    return response.json();
  }
}

module.exports = AddressController;