'use strict'

const Task = use('App/Models/Task')

class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params }) {
    const tasks = await Task.query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()

    return tasks
  }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, params }) {
    const data = request.only([
      'title',
      'description',
      'user_id',
      'due_date',
      'file_id'
    ])
    const task = await Task.create({ ...data, project_id: params.projects_id })
    await task.load('user')
    await task.load('project')
    await task.load('file')

    return task
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const task = await Task.findOrFail(params.id)
    await task.load('user')
    await task.load('project')
    await task.load('file')
    return task
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const data = request.only([
      'title',
      'description',
      'user_id',
      'due_date',
      'file_id'
    ])
    const task = await Task.findOrFail(params.id)

    task.merge(data)
    await task.save()
    await task.load('user')
    await task.load('project')
    await task.load('file')
    return task
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
  }
}

module.exports = TaskController
