const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const routes = require('./routes')

class App {
  constructor () {
    this.express = express()
    // variavel armazena e diz se o ambiente ta em produção ou não
    this.isDev = process.env.NODE_ENV !== 'production';

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: true,
      express: this.express,
      watch: this.isDev
    })

    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(routes)
  }
}

module.exports = new App().express
