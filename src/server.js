require("express-async-errors");
const express = require("express");
const AppError = require("./utils/AppError");
const app = express();

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on ${ PORT }`));

app.use(express.json());

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

app.get("/", (request, response) => {
  response.josn("HELLO WORLD :)");
});