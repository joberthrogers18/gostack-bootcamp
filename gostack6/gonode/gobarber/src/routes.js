const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentsController = require('./app/controllers/AppointmentsController')
const AvailableController = require('./app/controllers/AvailableController')

// rota para visualizar imagens
routes.get('/files/:file', FileController.show)

routes.use((req, res, next) => {
  // as views conseguir enxengar a variável para ser mostrada na tela
  // pelo res.locals
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// todas as rotas que começam com app, vai ter o middleware auth
routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/appointments/new/:provider_id', AppointmentsController.create)
routes.post('/app/appointments/new/:provider_id', AppointmentsController.store)
routes.get('/app/available/:provider', AvailableController.index)
routes.get('/app/dashboard-provider/:provider', DashboardController.search)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

module.exports = routes
