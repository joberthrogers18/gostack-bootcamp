const express = require('express');
const routes = express.Router();

const MainController = require('./app/controllers/MainController');

routes.get('/', MainController.index);
routes.post('/', MainController.store);

module.exports = routes;