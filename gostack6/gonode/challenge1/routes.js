const express = require('express')
const routes = express.Router()

const middleware_age = (req, res, next) => {
  const { age } = req.query

  if (age === undefined || age === '') {
    res.redirect('/')
  } else {
    next()
  }
}

routes.get('/', (req, res) => {
  return res.render('age')
})

routes.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

routes.get('/major', middleware_age, (req, res) => {
  const { age } = req.query
  return res.render('major', {
    age
  })
})

routes.get('/minor', middleware_age, (req, res) => {
  const { age } = req.query
  return res.render('minor', {
    age
  })
})

module.exports = routes
