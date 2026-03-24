import { v2 as cloudinary } from 'cloudinary'
import env from '#start/env'

cloudinary.config({
  cloud_name: env.get('CLOUDINARY_CLOUD_NAME'),
  api_key: env.get('CLOUDINARY_API_KEY'),
  api_secret: env.get('CLOUDINARY_API_SECRET').release(),
  secure: true,
})

export default class CloudinaryService {
  async uploadImage(filePath: string, options?: { folder?: string }) {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: options?.folder ?? env.get('CLOUDINARY_FOLDER'),
      resource_type: 'image',
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    }
  }

  async destroyImage(publicId: string) {
    return cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    })
  }
}
