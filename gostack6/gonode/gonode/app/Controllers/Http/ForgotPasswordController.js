'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      // se não consegui achar o usuário com esse email ele cai no catch
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` },
        message => {
          message
            .to(user.email)
            .from('joberth.rogers18@gmail.com', 'Jobs | Rogers')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      console.log(err)
      return response
        .status(err.status)
        .send({ error: { message: 'Algo não deu certo, esse email existe?' } })
    }
  }
}

module.exports = ForgotPasswordController
