import User from '#models/user'
import env from '#start/env'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.all()
    const adminEmail = env.get('ADMIN_EMAIL')
    const adminPassword = env.get('ADMIN_PASSWORD').release()
    const adminFullName = env.get('ADMIN_FULL_NAME') ?? null

    if (email !== adminEmail || password !== adminPassword) {
      session.flash('errorsBag', {
        email: 'Invalid credentials',
      })

      return response.redirect().back()
    }

    let user = await User.findBy('email', adminEmail)

    if (!user) {
      user = await User.create({
        fullName: adminFullName,
        email: adminEmail,
        password: await hash.make(adminPassword),
      })
    } else {
      const hasMatchingPassword = await hash.verify(user.password, adminPassword)

      if (!hasMatchingPassword || user.fullName !== adminFullName) {
        user.merge({
          fullName: adminFullName,
          password: await hash.make(adminPassword),
        })
        await user.save()
      }
    }

    await auth.use('web').login(user)
    return response.redirect().toPath('/dashboard')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect().toRoute('session.create')
  }
}
