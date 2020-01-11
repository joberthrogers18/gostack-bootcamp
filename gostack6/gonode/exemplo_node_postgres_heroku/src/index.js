const express = require("express");
const dotenv = require("dotenv");
const model = require('./app/models');
const routes = require('./routes');

const app = express();
const PORT = 3333;

dotenv.config();

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});