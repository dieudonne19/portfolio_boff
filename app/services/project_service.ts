import Project from '#models/project'
import CloudinaryService from '#services/cloudinary_service'
import db from '@adonisjs/lucid/services/db'

type ProjectPayload = {
  title: string
  description: string
  size: 'large' | 'medium' | 'small'
  stack: string
  projectCategoryId: number
  perso: boolean
  link?: string
  maintenance?: boolean
  images: {
    presentation: {
      url: string
      width: number
      height: number
    }
    others: {
      url: string
      width: number
      height: number
    }[]
  }
}

type ProjectAsset = {
  url: string
  publicId: string
  width: number
  height: number
}

type ProjectAssetPayload = Omit<ProjectPayload, 'images'>

const cloudinaryService = new CloudinaryService()
const CLOUDINARY_DELETE_SUCCESS_RESULTS = new Set(['ok', 'not found'])

export default class ProjectService {
  async list() {
    const projects = await Project.query()
      .preload('images', (query) => {
        query.orderBy('sort_order', 'asc')
      })
      .preload('category')

    return projects.map((project) => this.serialize(project))
  }

  async findOrFail(id: number) {
    const project = await Project.query()
      .where('id', id)
      .preload('images', (query) => {
        query.orderBy('sort_order', 'asc')
      })
      .preload('category')
      .firstOrFail()

    return this.serialize(project)
  }

  async create(payload: ProjectPayload) {
    const project = await db.transaction(async (trx) => {
      const createdProject = await Project.create(
        {
          title: payload.title,
          description: payload.description,
          size: payload.size,
          stack: payload.stack,
          projectCategoryId: payload.projectCategoryId,
          perso: payload.perso,
          link: payload.link ?? null,
          maintenance: payload.maintenance ?? false,
        },
        { client: trx }
      )

      await createdProject.related('images').createMany(
        [
          {
            ...payload.images.presentation,
            publicId: null,
            isPresentation: true,
            sortOrder: 0,
          },
          ...payload.images.others.map((image, index) => ({
            ...image,
            publicId: null,
            isPresentation: false,
            sortOrder: index + 1,
          })),
        ],
        { client: trx }
      )

      return createdProject
    })

    return this.findOrFail(Number(project.id))
  }

  async createFromAssets(
    payload: ProjectAssetPayload,
    assets: {
      presentation: ProjectAsset
      others: ProjectAsset[]
    }
  ) {
    const project = await db.transaction(async (trx) => {
      const createdProject = await Project.create(
        {
          title: payload.title,
          description: payload.description,
          size: payload.size,
          stack: payload.stack,
          projectCategoryId: payload.projectCategoryId,
          perso: payload.perso,
          link: payload.link ?? null,
          maintenance: payload.maintenance ?? false,
        },
        { client: trx }
      )

      await createdProject.related('images').createMany(
        [
          {
            ...assets.presentation,
            isPresentation: true,
            sortOrder: 0,
          },
          ...assets.others.map((image, index) => ({
            ...image,
            isPresentation: false,
            sortOrder: index + 1,
          })),
        ],
        { client: trx }
      )

      return createdProject
    })

    return this.findOrFail(Number(project.id))
  }

  async update(id: number, payload: ProjectPayload) {
    await db.transaction(async (trx) => {
      const project = await Project.findOrFail(id, { client: trx })

      project.merge({
        title: payload.title,
        description: payload.description,
        size: payload.size,
        stack: payload.stack,
        projectCategoryId: payload.projectCategoryId,
        perso: payload.perso,
        link: payload.link ?? null,
        maintenance: payload.maintenance ?? false,
      })

      await project.save()

      await project.related('images').query().delete()
      await project.related('images').createMany(
        [
          {
            ...payload.images.presentation,
            publicId: null,
            isPresentation: true,
            sortOrder: 0,
          },
          ...payload.images.others.map((image, index) => ({
            ...image,
            publicId: null,
            isPresentation: false,
            sortOrder: index + 1,
          })),
        ],
        { client: trx }
      )
    })

    return this.findOrFail(id)
  }

  async delete(id: number) {
    const project = await Project.query().where('id', id).preload('images').firstOrFail()

    const cloudinaryImages = project.images.filter((image) => image.publicId)
    const deleteResults = await Promise.all(
      cloudinaryImages.map(async (image) => {
        const result = await cloudinaryService.destroyImage(image.publicId!)

        return {
          imageId: image.id,
          publicId: image.publicId!,
          result: result.result,
        }
      })
    )

    const failedDeletes = deleteResults.filter(
      (deleteResult) => !CLOUDINARY_DELETE_SUCCESS_RESULTS.has(deleteResult.result)
    )

    if (failedDeletes.length > 0) {
      const failedPublicIds = failedDeletes.map((deleteResult) => deleteResult.publicId).join(', ')

      throw new Error(`Cloudinary deletion failed for: ${failedPublicIds}`)
    }

    await project.delete()
  }

  private serialize(project: Project) {
    const presentation = project.images.find((image) => image.isPresentation) ?? null
    const others = project.images.filter((image) => !image.isPresentation)

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      size: project.size,
      stack: project.stack,
      category: {
        name: project.category.name,
        label: project.category.label,
      },
      perso: project.perso,
      link: project.link,
      maintenance: project.maintenance,
      images: {
        presentation: presentation ? this.serializeImage(presentation) : null,
        others: others.map((image) => this.serializeImage(image)),
      },
      createdAt: project.createdAt?.toISO() ?? null,
      updatedAt: project.updatedAt?.toISO() ?? null,
    }
  }

  private serializeImage(image: Project['images'][number]) {
    return {
      id: image.id,
      url: image.url,
      publicId: image.publicId,
      width: image.width,
      height: image.height,
      createdAt: image.createdAt?.toISO() ?? null,
      updatedAt: image.updatedAt?.toISO() ?? null,
    }
  }
}
