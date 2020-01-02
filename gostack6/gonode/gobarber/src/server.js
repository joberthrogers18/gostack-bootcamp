const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const path = require('path')
const flash = require('connect-flash')
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
    // middleware usado para listar mensagens na tela
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'Myappadmin',
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true
      })
    )
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: true,
      express: this.express,
      watch: this.isDev
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(routes)
  }
}

module.exports = new App().express
