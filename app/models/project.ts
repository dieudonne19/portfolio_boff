import Image from '#models/image'
import ProjectCategory from '#models/project_category'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Project extends BaseModel {
  static table = 'projects'

  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'project_category_id' })
  declare projectCategoryId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare size: 'large' | 'medium' | 'small'

  @column()
  declare stack: string

  @column()
  declare perso: boolean

  @column()
  declare link: string | null

  @column()
  declare maintenance: boolean

  @hasMany(() => Image)
  declare images: HasMany<typeof Image>

  @belongsTo(() => ProjectCategory)
  declare category: BelongsTo<typeof ProjectCategory>

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime | null
}
