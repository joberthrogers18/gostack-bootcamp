const express = require('express');

const routes = require('./routes');
const database = require('./config/database-config');

class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  database() {
    this.database = database;
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
