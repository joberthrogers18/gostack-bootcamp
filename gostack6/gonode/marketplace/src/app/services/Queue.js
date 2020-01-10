const kue = require('kue');
const Sentry = require('@sentry/node');
const redisConfig = require('../../config/redis');
const jobs = require('../jobs');

const Queue = kue.createQueue({
  redis: redisConfig,
});

// Processar todos o jobs que tem a key "PurchaseMail" e chamando
// o metodo handle
Queue.process(jobs.PurchaseEmail.key, jobs.PurchaseEmail.handle);

Queue.on('error', Sentry.captureException);

module.exports = Queue;
