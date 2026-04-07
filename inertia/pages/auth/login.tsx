import { Form, Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'

function FieldError({ error }: { error?: string }) {
  if (!error) return null

  return <p className="text-sm text-red-600">{error}</p>
}

export default function Login() {
  return (
    <>
      <Head title="Login" />
      <div className="min-h-screen px-4 relative py-8 text-stone-900">
        <div className="mx-auto min-h-[calc(100vh-4rem)] overflow-hidden shadow-[0_28px_100px_-40px_rgba(41,37,36,0.45)]">
          <section className="relative flex items-center p-6">
            <Link
              href="/"
              className={buttonVariants({ variant: 'ghost', className: 'absolute top-2 left-2' })}
            >
              Home
            </Link>
            <div className="mx-auto w-full max-w-sm">
              <div className="mb-8 flex flex-col items-center">
                <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Sign In
                </h4>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Access your dashboard
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  Use your account credentials to continue.
                </p>
              </div>

              <Form route="session.store">
                {({ errors, processing }) => (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="username"
                        placeholder="name@example.com"
                        data-invalid={errors.email ? 'true' : undefined}
                      />
                      <FieldError error={errors.email} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        data-invalid={errors.password ? 'true' : undefined}
                      />
                      <FieldError error={errors.password} />
                    </div>

                    <Separator />

                    <Button type="submit" size="lg" className="w-full" disabled={processing}>
                      {processing ? (
                        <Loader className="animate-spin duration-150" />
                      ) : (
                        <span>Login</span>
                      )}
                    </Button>
                  </div>
                )}
              </Form>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
