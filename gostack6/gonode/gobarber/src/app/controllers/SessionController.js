const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Usuário não encontrado')
      return res.redirect('/')
    }

    let isValidPassword = false

    try {
      isValidPassword = await user.checkPassword(password)
    } catch (err) {
      console.log(err)
    }

    if (!isValidPassword) {
      console.log('Senha incorreta')
      return res.redirect('/')
    }

    // salvando a session para não precisar logar a todo momento
    req.session.user = user

    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    // destruindo a sessão de usuário
    req.session.destroy(() => {
      // limpa o cookie que está salvo no browser depois que acabar a session
      //, limpando pelo nome da sessão que é salvo como 'root'
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
