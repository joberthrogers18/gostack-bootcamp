const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const exphbs = require('express-handlebars');
const mailConfig = require('../../config/mail');
// require('../views/emails/partials')

const transport = nodemailer.createTransport(mailConfig);

const viewPath = path.resolve(__dirname, '..', 'views', 'emails');
const partialsPath = path.resolve(viewPath, 'partials');

const options = {
  extName: '.hbs' /* or '.handlebars' */,
  viewPath,
  viewEngine: {
    extname: '.hbs',
    layoutsDir: viewPath,
    partialsDir: partialsPath,
  },
};

// configurar nodemailer lidar com os templates de email
transport.use('compile', hbs(options));

module.exports = transport;
