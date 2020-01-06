module.exports = {
  host: String(process.env.MAIL_HOST),
  port: String(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: String(process.env.MAIL_USER),
    pass: String(process.env.MAIL_PASSWORD),
  },
};
