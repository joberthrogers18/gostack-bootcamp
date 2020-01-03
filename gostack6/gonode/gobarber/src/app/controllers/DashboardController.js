const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    if (!req.session.user.provider) {
      const providers = await User.findAll({ where: { provider: true } })
      return res.render('dashboard', { providers })
    } else {
      return res.render('dashboard_provider')
    }
  }

  async search (req, res) {
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

    let scheduleAux = []

    if (appointments.length === 0) {
      return res.json({ schedules: scheduleAux })
    }

    await appointments.map(async app => {
      const user = await User.findByPk(app.user_id)
      const date = moment(app.date).format('HH:mm')

      scheduleAux.push({
        user_name: user.name,
        user_avatar: user.avatar,
        date
      })

      if (scheduleAux.length === appointments.length) {
        return res.json({ schedules: scheduleAux })
      }
    })

    // console.log('passou')
    // return res.json({ schedules })
  }
}

module.exports = new DashboardController()
