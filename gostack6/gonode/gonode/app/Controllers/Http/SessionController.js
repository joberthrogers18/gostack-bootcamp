'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    // Gerando o token
    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
