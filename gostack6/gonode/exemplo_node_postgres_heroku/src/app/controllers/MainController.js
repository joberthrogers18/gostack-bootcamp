const {
  User
} = require('../models');

module.exports = {
  async index(req, res) {
    const user = await User.findAll();

    return res.json(user);
  },

  async store(req, res) {
    try {
      const user = await User.create({
        name: 'john',
        nick: 'jo'
      })

      return res.json(user);

    } catch (err) {
      return res.json({
        error: 'error' + err
      });
    }

  }
}