import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.enum('size', ['large', 'medium', 'small']).notNullable()
      table.text('stack').notNullable()
      table.boolean('perso').notNullable().defaultTo(false)
      table.string('link').nullable()
      table.boolean('maintenance').notNullable().defaultTo(false)

      table
        .bigInteger('project_category_id')
        .references('id')
        .inTable('project_categories')
        .onDelete('RESTRICT')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
