const express = require('express');
const validate = require('express-validation');
const Youch = require('youch');
const Sentry = require('@sentry/node');

const routes = require('./routes');
const database = require('./config/database-config');
const SentryConfig = require('./config/sentry');

class App {
  constructor() {
    this.express = express();
    this.Dev = process.env.NODE_ENV !== 'production';

    this.sentry();
    this.middlewares();
    this.routes();
    this.database();
    // tem que está sempre depois das rotas
    this.exceptions();
  }

  sentry() {
    Sentry.init(SentryConfig);
  }

  database() {
    this.database = database;
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(
      express.urlencoded({
        extended: true,
      }),
    );
  }

  routes() {
    this.express.use(routes);
  }

  exceptions() {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler());
    }

    // quando o middleware tem quatro parametros
    // o express já sabe que é uma tratativa de erro
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err);

        return res.json(await youch.toJSON());
      }

      return res.status(err.status || 500).json({
        error: 'Internal Server Error',
      });
    });
  }
}

module.exports = new App().express;
