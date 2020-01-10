// para fazer validação em campos do schema
// eh um schema que compara os objetos e verifica
// se ha discrepancia quando se vai manupular esse objeto
const Joi = require('joi');

module.exports = {
  body: {
    ad: Joi.string().required(),
    content: Joi.string().required(),
  },
};
