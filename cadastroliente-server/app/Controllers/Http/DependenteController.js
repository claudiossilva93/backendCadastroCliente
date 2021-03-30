'use strict'

const Dependente = use('App/Models/Dependente')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with dependentes
 */
class DependenteController {
  /**
   * Show a list of all dependentes.
   * GET dependentes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const dependentes = await Dependente.all()

    return dependentes

  }

  /**
   * Create/save a new dependente.
   * POST dependentes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const data = request.only([
      'cliente_id',
      'nome',
      'idade',
      'tipo'
    ])

    const dependente = await Dependente.create( data )

    return dependente

  }

  /**
   * Display a single dependente.
   * GET dependentes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    try {
      const dependente = await Dependente.findOrFail(params.id)

      return dependente

    }catch (error) {

      switch (error.name) {
        case 'ModelNotFoundException':
          return response.notFound({ message: 'Dependente não encontrado.' })

        default:
          return response.badRequest({ message: 'something_went_wrong' })
      }
    }

  }

  /**
   * Update dependente details.
   * PUT or PATCH dependentes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {

      const dependente = await Dependente.findOrFail(params.id)

      const data = request.only([
        'nome',
        'idade',
        'tipo'
      ])

      dependente.merge(data)

      await dependente.save()

      return dependente

    }catch(error)
    {
      switch (error.name) {
        case 'ModelNotFoundException':
          return response.notFound({ message: 'Dependente não encontrado.' })

        default:
          return response.badRequest({ message: 'something_went_wrong' })
      }
    }

  }

  /**
   * Delete a dependente with id.
   * DELETE dependentes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const dependente = await Dependente.findOrFail(params.id)

    return await dependente.delete()

  }

    /**
   * Display a single dependente.
   * GET dependentesByCliente/:cliente_id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
     async dependentesByCliente ({ params, request, response, view }) {

      try {
        const dependentes = await Dependente.query().where('cliente_id', params.cliente_id).fetch()

        return dependentes

      }catch (error) {

        console.log( error )

        switch (error.name) {
          case 'ModelNotFoundException':
            return response.notFound({ message: 'Dependente não encontrado.' })

          default:
            return response.badRequest({ message: 'something_went_wrong' })
        }
      }

    }
}

module.exports = DependenteController
