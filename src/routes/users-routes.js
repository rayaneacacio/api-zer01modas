const { Router } = require("express");

const UsersController = require("../controllers/users-controller");
const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", usersController.index);
usersRoutes.post("/show", usersController.show);
usersRoutes.patch("/", usersController.update);
usersRoutes.post("/delete", usersController.delete);

module.exports = usersRoutes;
