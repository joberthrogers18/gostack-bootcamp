const express = require('express');
const validate = require('express-validation');

const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

// Automatizando os controllers e não precisando importar vários
const controllers = require('./app/controllers');
const validators = require('./app/validators');

routes.post('/users', validate(validators.User), controllers.UserController.store);
routes.post('/session', validate(validators.Session), controllers.SessionController.store);

routes.use(authMiddleware);

// Ads routes
routes.get('/ads', controllers.AdController.index);
routes.get('/ads/:id', controllers.AdController.show);
routes.post('/ads', validate(validators.Ad), controllers.AdController.store);
routes.put('/ads/:id', validate(validators.Ad), controllers.AdController.update);
routes.delete('/ads/:id', controllers.AdController.destroy);

// Purchases

routes.post('/purchases', validate(validators.Purchase), controllers.PurchaseController.store);
module.exports = routes;
