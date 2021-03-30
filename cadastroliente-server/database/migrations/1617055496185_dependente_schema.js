'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DependenteSchema extends Schema {
  up () {
    this.create('dependentes', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes')
      table.string('nome').notNullable()
      table.integer('idade').notNullable()
      table.string('tipo').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('dependentes')
  }
}

module.exports = DependenteSchema
