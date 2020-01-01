const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    req.body.avatar = 'teste.jpg';

    try {
      await User.create(req.body)
    } catch (err) {
      console.log(err)
    }

    return res.redirect('/')
  }
}

module.exports = new UserController()
