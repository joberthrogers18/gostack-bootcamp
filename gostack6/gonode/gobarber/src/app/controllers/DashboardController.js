const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    if (!req.session.user.provider) {
      const providers = await User.findAll({ where: { provider: true } })
      return res.render('dashboard', { providers })
    } else {
      const appointments = await Appointment.findAll({
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              moment()
                .startOf('day')
                .format(),
              moment()
                .endOf('day')
                .format()
            ]
          }
        }
      })

      console.log(
        moment()
          .endOf('day')
          .format()
      )

      appointments.map(app => {
        console.log(app)
      })

      return res.render('dashboard_provider')
    }
  }
}

module.exports = new DashboardController()
