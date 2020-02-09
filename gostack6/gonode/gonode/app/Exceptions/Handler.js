'use strict'

const Sentry = require('@sentry/node')
const Config = use('Config')

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Youch = use('youch')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  // Lidar com erros e como isso vai ser mostrado para o cliente
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if (Env.get('NODE_ENV') === 'development') {
      // Youch eh um formatador de erro persente no adonis
      const youch = new Youch(error, request.request)
      const errorJson = await youch.toJSON()
      return response.status(error.status).send(errorJson)
    }

    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    Sentry.init(Config.get('services.sentry'))
    Sentry.captureException(error)
  }
}

module.exports = ExceptionHandler
