const Mail = require('../services/Mail');

class PurchaseEmail {
  // Se usar PurchaseEmail.key tem acesso por essa variável por causa
  // do get
  get key() {
    return 'PurchaseMail';
  }

  async handle(job, done) {
    const {
      ad,
      user,
      content,
    } = job.data;

    await Mail.sendMail({
      from: '"Joberth Rogers" <joberth.rogers18@gmail.com>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase',
      context: {
        user,
        content,
        ad,
      },
    });

    return done();
  }
}

module.exports = new PurchaseEmail();
