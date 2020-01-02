module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // Um objeto de infomeções que fica disponivéis para todas as views (templates)
    res.locals.user = req.session.user

    return next()
  }

  return res.redirect('/')
};
