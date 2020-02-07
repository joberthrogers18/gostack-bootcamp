'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('files/:id', 'FileController.show')
// Rotas específicas para usuários logados
Route.group(() => {
  Route.post('files', 'FileController.store')

  // Chama todas as rotas de api crud base
  Route.resource('projects', 'ProjectController').apiOnly()
}).middleware(['auth'])
