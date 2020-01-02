const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const { provider_id: providerId } = req.params

    const provider = await User.findByPk(providerId)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider_id: providerId } = req.params
    const { date } = req.body

    await Appointment.create({
      date,
      provider_id: providerId,
      user_id: id
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
