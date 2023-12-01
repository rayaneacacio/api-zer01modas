const { Router } = require("express");

const CuponsController = require("../controllers/cupons-controller");
const cuponsController = new CuponsController();

const cuponsRoutes = Router();

cuponsRoutes.post("/", cuponsController.create);
cuponsRoutes.get("/index", cuponsController.index);
cuponsRoutes.get("/show", cuponsController.show);
cuponsRoutes.delete("/delete", cuponsController.delete);

module.exports = cuponsRoutes;