require("express-async-errors");
const express = require("express");
const AppError = require("./utils/AppError");
const sqliteConnection = require("./database/sqlite/index");
const routes = require("./routes/index");
const app = express();

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on ${ PORT }`));

app.use(express.json());

sqliteConnection();
app.use(routes);

app.get("/", (request, response) => {
  response.json("HELLO WORLD :)");
});

app.use((error, request, response, next) => {
  //middleware para tratar erros;
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});