const CuponsRepository = require("../repositories/cupons-repository");

class CuponsController {
  async create(request, response) {
    const { cupom, discount } = request.body;
    const cuponsRepository = new CuponsRepository();

    await cuponsRepository.create(cupom, discount);

    return response.json();
  }

  async index(request, response) {
    const cuponsRepository = new CuponsRepository();

    const cupons = await cuponsRepository.allCupons();

    return response.json(cupons);
  }

  async show(request, response) {
    const { name } = request.query;
    const cuponsRepository = new CuponsRepository();

    const cupom = cuponsRepository.findCupom(name);

    return response.json(cupom);
  }

  async delete(request, response) {
    const { name, discount } = request.query;
    const cuponsRepository = new CuponsRepository();

    await cuponsRepository.delete(name, discount);

    return response.json();
  }
}

module.exports = CuponsController;