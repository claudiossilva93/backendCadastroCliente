'use strict'

const Cliente = use('App/Models/Cliente')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  /**
   * Show a list of all clientes.
   * GET clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const clientes = await Cliente.query().with('dependentes').fetch()

    return clientes

  }

  /**
   * Create/save a new cliente.
   * POST clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    try {

    const data = request.only([
      'codigo',
      'nome',
      'endereco',
      'telefone'
    ])

    const cliente = await Cliente.create( data )

    return cliente
    }catch (error) {

      switch (error.name) {
        case 'RequestError':
          return response.notFound({ message: 'Existe(m) campos obrigatórios não preenchido.' })

        default:
          return response.badRequest({ message: 'something_went_wrong' })
      }
    }

  }

  /**
   * Display a single cliente.
   * GET clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    try {
      const cliente = await Cliente.findOrFail(params.id)

      await cliente.load('dependentes')

      return cliente

    }catch (error) {

      switch (error.name) {
        case 'ModelNotFoundException':
          return response.notFound({ message: 'Cliente não encontrado.' })

        default:
          return response.badRequest({ message: 'something_went_wrong' })
      }
    }



  }

  /**
   * Update cliente details.
   * PUT or PATCH clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {

      const cliente = await Cliente.findOrFail(params.id)

      const data = request.only([
        'nome',
        'endereco',
        'telefone'
      ])

      cliente.merge(data)

      await cliente.save()

      return cliente

    }catch(error)
    {
      switch (error.name) {
        case 'ModelNotFoundException':
          return response.notFound({ message: 'Cliente não encontrado.' })

        default:
          return response.badRequest({ message: 'something_went_wrong' })
      }
    }

  }

  /**
   * Delete a cliente with id.
   * DELETE clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const cliente = await Cliente.findOrFail(params.id)

    return await cliente.delete()

  }
}

module.exports = ClienteController
