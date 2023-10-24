require("express-async-errors");
const express = require("express");
const AppError = require("./utils/AppError");
const sqliteConnection = require("./database/sqlite/index");
const routes = require("./routes/index");
const uploadConfig = require("./configs/upload");
const cors = require("cors");
const app = express();

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on ${ PORT }`));

app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

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