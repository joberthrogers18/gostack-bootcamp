'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    // Pegando do body
    const data = request.only([
      'username',
      'email',
      'password'
    ])
    const addresses = request.input('addresses')

    // A transaction serve para dar um rollback ao criar o usuário ou criar os endereços
    // caso algum dos dois tenha algum parametro errado, se ambos estiverem certos ele da o commit
    // e salva realmente
    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)
    await user.addresses().createMany(addresses, trx)

    await trx.commit()

    return user
  }
}

module.exports = UserController
