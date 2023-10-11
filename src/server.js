const express = require("express");
const app = express();

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on ${ PORT }`));

app.use(express.json());

app.get("/", (request, response) => {
  response.json("HELLO WORLD :)");
});