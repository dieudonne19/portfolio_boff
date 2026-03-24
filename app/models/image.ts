import Project from '#models/project'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Image extends BaseModel {
  static table = 'images'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'project_id' })
  declare projectId: number

  @column()
  declare url: string

  @column({ columnName: 'public_id' })
  declare publicId: string | null

  @column()
  declare width: number

  @column()
  declare height: number

  @column({ columnName: 'is_presentation' })
  declare isPresentation: boolean

  @column({ columnName: 'sort_order' })
  declare sortOrder: number

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime | null
}
