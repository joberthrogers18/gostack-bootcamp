'use strict'

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
}

module.exports = ForgotPassword
