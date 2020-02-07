'use strict'

const Antl = use('Antl')

class ForgotPassword {
  // Se achar um erro continuar e não parar no primeiro
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      redirect_url: 'required|url'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ForgotPassword
