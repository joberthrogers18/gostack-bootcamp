// para fazer validação em campos do schema
// eh um schema que compara os objetos e verifica
// se ha discrepancia quando se vai manupular esse objeto
const Joi = require('joi');

module.exports = {
  body: {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6),
  },
};
