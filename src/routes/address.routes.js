const { Router } = require("express");

const AddressController = require("../controllers/address-controller");
const addressController = new AddressController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const addressRoutes = Router();

addressRoutes.use(EnsureAuthenticated);

addressRoutes.post("/", addressController.create);
addressRoutes.get("/index", addressController.index);
addressRoutes.patch("/update", addressController.update);
addressRoutes.delete("/delete", addressController.delete);

module.exports = addressRoutes;