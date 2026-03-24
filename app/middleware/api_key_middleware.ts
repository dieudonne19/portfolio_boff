import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { timingSafeEqual } from 'node:crypto'

const API_KEY_HEADER = 'x-api-key'

function safeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

export default class ApiKeyMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const apiKey = request.header(API_KEY_HEADER)
    const expectedApiKey = env.get('PORTFOLIO_API_KEY').release()

    if (typeof apiKey !== 'string' || !safeEquals(apiKey, expectedApiKey)) {
      return response.unauthorized({
        message: 'Invalid API key',
      })
    }

    return next()
  }
}
