const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // quando eh enviado o token para ca ele vem com "Bearer token" e ai
  // como eu quero só o token eu dou split no espaço
  const [, token] = authHeader.split(' ');

  try {
    // como o jwt não retorna uma promisse nos precisamos "promissificar" a
    // função para pegar o resutado pertinente nela,
    // ela usa o modelo antigo usando callback
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Token Invalid' });
  }
};
