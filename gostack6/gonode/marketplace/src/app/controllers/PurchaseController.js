const Ad = require('../models/Ad');
const User = require('../models/User');
const Queue = require('../services/Queue');
const PurchaseMail = require('../jobs/PurchaseEmail');

class PurchaseController {
  async store(req, res) {
    const {
      ad,
      content,
    } = req.body;

    const purchaseAd = await Ad.findById(ad).populate('author');
    // usuario logado
    const user = await User.findById(req.userId);

    // "context" são as varíaveis que serão usadas pelo template do email
    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    return res.send();
  }
}

module.exports = new PurchaseController();
