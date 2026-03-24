import CloudinaryService from '#services/cloudinary_service'
import ProjectCategoryService from '#services/project_category_service'
import ProjectService from '#services/project_service'
import type { HttpContext } from '@adonisjs/core/http'

const projectService = new ProjectService()
const cloudinaryService = new CloudinaryService()
const projectCategoryService = new ProjectCategoryService()

export default class DashboardProjectsController {
  async index({ inertia }: HttpContext) {
    const projects = await projectService.list()

    return inertia.render(
      'dashboard/projects/index' as never,
      {
        projects,
      } as any
    )
  }

  async create({ inertia }: HttpContext) {
    const categories = await projectCategoryService.list()

    return inertia.render('dashboard/projects/create' as never, { categories } as any)
  }

  async store({ request, response, session }: HttpContext) {
    const presentationImage = request.file('presentationImage', {
      size: '20mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'],
    })
    const otherImages = request.files('otherImages', {
      size: '20mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'],
    })

    if (!presentationImage || !presentationImage.isValid || !presentationImage.tmpPath) {
      session.flash('errorsBag', {
        presentationImage: 'A valid presentation image is required',
      })
      return response.redirect().back()
    }

    const validOtherImages = otherImages.filter((file) => file.isValid && file.tmpPath)
    const uploadedPublicIds: string[] = []

    try {
      const presentationUpload = await cloudinaryService.uploadImage(presentationImage.tmpPath, {
        folder: 'projects/presentation',
      })
      uploadedPublicIds.push(presentationUpload.publicId)

      const otherUploads = await Promise.all(
        validOtherImages.map(async (file) => {
          const upload = await cloudinaryService.uploadImage(file.tmpPath!, {
            folder: 'projects/gallery',
          })
          uploadedPublicIds.push(upload.publicId)
          return upload
        })
      )

      await projectService.createFromAssets(
        {
          title: request.input('title'),
          description: request.input('description'),
          size: request.input('size'),
          stack: request.input('stack'),
          projectCategoryId: Number(request.input('projectCategoryId')),
          perso: request.input('perso') === 'on',
          link: request.input('link') || undefined,
          maintenance: request.input('maintenance') === 'on',
        },
        {
          presentation: presentationUpload,
          others: otherUploads,
        }
      )

      return response.redirect().toPath('/dashboard/projects')
    } catch (error) {
      await Promise.all(
        uploadedPublicIds.map((publicId) => cloudinaryService.destroyImage(publicId))
      )
      throw error
    }
  }
}
