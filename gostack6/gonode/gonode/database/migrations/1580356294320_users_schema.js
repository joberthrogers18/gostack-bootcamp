'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.string('token')
      table.timestamp('token_created_at')
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
