import Image from '#models/image'
import CloudinaryService from '#services/cloudinary_service'
import ImageService from '#services/image_service'
import { imageValidator } from '#validators/image'
import type { HttpContext } from '@adonisjs/core/http'

const imageService = new ImageService()
const cloudinaryService = new CloudinaryService()

export default class ImagesController {
  async store({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(imageValidator)
    const image = await imageService.create(Number(params.projectId), payload)

    return response.created({
      id: image.id,
      projectId: image.projectId,
      url: image.url,
      publicId: image.publicId,
      width: image.width,
      height: image.height,
      isPresentation: image.isPresentation,
      sortOrder: image.sortOrder,
      createdAt: image.createdAt?.toISO() ?? null,
      updatedAt: image.updatedAt?.toISO() ?? null,
    })
  }

  async upload({ params, request, response }: HttpContext) {
    const file = request.file('file', {
      size: '20mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'],
    })

    if (!file || !file.isValid || !file.tmpPath) {
      return response.badRequest({
        message: 'A valid image file is required',
        errors: file?.errors ?? [],
      })
    }

    const uploaded = await cloudinaryService.uploadImage(file.tmpPath, {
      folder: `projects/${params.projectId}`,
    })

    const image = await imageService.create(Number(params.projectId), {
      url: uploaded.url,
      publicId: uploaded.publicId,
      width: uploaded.width,
      height: uploaded.height,
      isPresentation: request.input('isPresentation') === 'true',
      sortOrder: Number(request.input('sortOrder') ?? 0),
    })

    return response.created({
      id: image.id,
      projectId: image.projectId,
      url: image.url,
      publicId: image.publicId,
      width: image.width,
      height: image.height,
      isPresentation: image.isPresentation,
      sortOrder: image.sortOrder,
      createdAt: image.createdAt?.toISO() ?? null,
      updatedAt: image.updatedAt?.toISO() ?? null,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(imageValidator)
    const image = await Image.findOrFail(Number(params.id))
    const updatedImage = await imageService.update(image, payload)

    return response.ok({
      id: updatedImage.id,
      projectId: updatedImage.projectId,
      url: updatedImage.url,
      publicId: updatedImage.publicId,
      width: updatedImage.width,
      height: updatedImage.height,
      isPresentation: updatedImage.isPresentation,
      sortOrder: updatedImage.sortOrder,
      createdAt: updatedImage.createdAt?.toISO() ?? null,
      updatedAt: updatedImage.updatedAt?.toISO() ?? null,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const image = await Image.findOrFail(Number(params.id))

    if (image.publicId) {
      await cloudinaryService.destroyImage(image.publicId)
    }

    await imageService.delete(image)

    return response.noContent()
  }
}
