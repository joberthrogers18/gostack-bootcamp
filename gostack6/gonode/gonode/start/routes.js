'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('files/:id', 'FileController.show')

// Rotas específicas para usuários logados, por isso
// o middleware de auth
Route.group(() => {
  Route.post('files', 'FileController.store')

  // Chama todas as rotas de api crud base para projects
  Route.resource('projects', 'ProjectController').apiOnly()
  // coloca o id do project antes de task na url, para ver
  // funcionando basta executar "npx @adonisjs/cli route:list"
  Route.resource('projects.tasks', 'TaskController').apiOnly()
}).middleware(['auth'])
