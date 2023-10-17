const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const productsRoutes = require("./products.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/products", productsRoutes);

module.exports = routes;