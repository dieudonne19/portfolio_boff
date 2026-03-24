import { Form, Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { ChevronLeft } from 'lucide-react'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import type { InertiaProps } from '~/types'

function FieldError({ error }: { error?: string }) {
  if (!error) return null

  return <p className="text-sm text-red-600">{error}</p>
}

export default function DashboardProjectCategoriesCreate({
  user,
  categories,
}: InertiaProps<{
  categories: {
    id: number
    name: string
    label: string
  }[]
}>) {
  return (
    <>
      <Head title="New Project Category" />
      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr] p-4">
        <section className="p-4 bg-card">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">New category</h2>
            </div>
            <Link href="/dashboard/projects/new" className={buttonVariants({ variant: 'outline' })}>
              <ChevronLeft />
              <span>Back</span>
            </Link>
          </div>

          <Form action="/dashboard/project-categories" method="post">
            {({ errors, processing }) => (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Internal name</Label>
                  <Input id="name" name="name" placeholder="web-app" />
                  <p className="text-xs text-stone-500">
                    Stable slug-like name used by the backend.
                  </p>
                  <FieldError error={errors.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="label">Display label</Label>
                  <Input id="label" name="label" placeholder="Web App" />
                  <p className="text-xs text-stone-500">Human-readable label shown in the UI.</p>
                  <FieldError error={errors.label} />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={processing}>
                  {processing ? 'Creating...' : 'Create category'}
                </Button>
              </div>
            )}
          </Form>
        </section>

        <section className="p-4 bg-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                Existing categories
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Current library</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <article
                key={category.id}
                className="rounded-lg border border-stone-200 bg-stone-50 py-2 px-4"
              >
                <div className="text-lg font-semibold text-stone-900">{category.label}</div>
                <div className="mt-1 text-sm text-stone-500">{category.name}</div>
              </article>
            ))}
            {categories.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-stone-300 bg-stone-50 p-6 text-sm text-stone-500">
                No categories yet. Create the first one here, then use it in the project upload
                form.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </>
  )
}
