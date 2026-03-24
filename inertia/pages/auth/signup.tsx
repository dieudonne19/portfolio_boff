import { Form, Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

function FieldError({ error }: { error?: string }) {
  if (!error) return null

  return <p className="text-sm text-red-600">{error}</p>
}
// cvv 245
export default function Signup() {
  return (
    <>
      <Head title="Signup" />
      <div className="min-h-screen  px-4 py-8 text-stone-900">
        <div className="mx-auto min-h-[calc(100vh-4rem)] overflow-hidden border border-border bg-card">
          <section className="flex items-center p-6 sm:p-10">
            <div className="mx-auto w-full max-w-lg">
              <div className="mb-8">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Create Account
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  Start building your portfolio space
                </h1>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  Create an account to access the dashboard, publish projects and manage image
                  uploads.
                </p>
              </div>

              <Form route="new_account.store">
                {({ errors, processing }) => (
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="fullName">Full name</Label>
                      <Input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Your full name"
                        data-invalid={errors.fullName ? 'true' : undefined}
                      />
                      <FieldError error={errors.fullName} />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
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
                        autoComplete="new-password"
                        placeholder="Minimum 8 characters"
                        data-invalid={errors.password ? 'true' : undefined}
                      />
                      <FieldError error={errors.password} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passwordConfirmation">Confirm password</Label>
                      <Input
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        autoComplete="new-password"
                        placeholder="Repeat your password"
                        data-invalid={errors.passwordConfirmation ? 'true' : undefined}
                      />
                      <FieldError error={errors.passwordConfirmation} />
                    </div>

                    <div className="md:col-span-2">
                      <Button type="submit" size="lg" className="w-full" disabled={processing}>
                        {processing ? (
                          <Loader className="animate-spin duration-150" />
                        ) : (
                          <span>Create account</span>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </Form>

              <div className="mt-8 border border-border rounded-lg bg-card p-4 text-sm text-stone-600">
                Already registered?{' '}
                <Link
                  href="/login"
                  className="font-medium text-amber-800 underline-offset-4 hover:underline"
                >
                  Login here
                </Link>
                .
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
