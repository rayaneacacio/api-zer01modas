const { Router } = require("express");

const UsersController = require("../controllers/users-controller");
const usersController = new UsersController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", usersController.index);
usersRoutes.post("/show", EnsureAuthenticated, usersController.show);
usersRoutes.patch("/", EnsureAuthenticated, usersController.update);
usersRoutes.post("/delete", EnsureAuthenticated, usersController.delete);

module.exports = usersRoutes;
