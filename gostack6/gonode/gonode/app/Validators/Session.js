'use strict'

class Session {
  // Se achar um erro continuar e não parar no primeiro
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }
}

module.exports = Session
