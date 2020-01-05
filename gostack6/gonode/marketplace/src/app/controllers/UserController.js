const User = require('../models/User');

class UserController {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = await User.create(req.body);

    return res.status(200).json(user);
  }
}

module.exports = new UserController();
