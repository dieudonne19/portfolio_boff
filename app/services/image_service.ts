import Image from '#models/image'

type ImagePayload = {
  url: string
  publicId?: string | null
  width: number
  height: number
  isPresentation?: boolean
  sortOrder?: number
}

export default class ImageService {
  async create(projectId: number, payload: ImagePayload) {
    if (payload.isPresentation) {
      await this.clearPresentationImage(projectId)
    }

    return Image.create({
      projectId,
      url: payload.url,
      publicId: payload.publicId ?? null,
      width: payload.width,
      height: payload.height,
      isPresentation: payload.isPresentation ?? false,
      sortOrder: payload.sortOrder ?? 0,
    })
  }

  async update(image: Image, payload: Partial<ImagePayload>) {
    const nextPresentation = payload.isPresentation ?? image.isPresentation

    if (nextPresentation) {
      await this.clearPresentationImage(image.projectId, image.id)
    }

    image.merge({
      url: payload.url ?? image.url,
      publicId: payload.publicId ?? image.publicId,
      width: payload.width ?? image.width,
      height: payload.height ?? image.height,
      isPresentation: nextPresentation,
      sortOrder: payload.sortOrder ?? image.sortOrder,
    })

    await image.save()

    return image
  }

  async delete(image: Image) {
    await image.delete()
  }

  private async clearPresentationImage(projectId: number, exceptImageId?: number) {
    const query = Image.query()
      .where('project_id', projectId)
      .where('is_presentation', true)

    if (exceptImageId) {
      query.whereNot('id', exceptImageId)
    }

    await query.update({ isPresentation: false })
  }
}
