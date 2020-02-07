'use strict'

const Antl = use('Antl')

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

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Session
