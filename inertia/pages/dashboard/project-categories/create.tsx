import { Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { ChevronLeft, Pencil } from 'lucide-react'
import { ProjectCategoryForm } from '~/components/pages/dashboard/project-category-form'
import { buttonVariants } from '~/components/ui/button'
import type { InertiaProps } from '~/types'

export default function DashboardProjectCategoriesCreate({
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

          <ProjectCategoryForm
            action="/dashboard/project-categories"
            method="post"
            submitLabel="Create category"
            submittingLabel="Creating..."
          />
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
              <article key={category.id} className="rounded-lg border bg-card py-2 px-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-lg font-semibold">{category.label}</div>
                  <Link
                    href={`/dashboard/project-categories/${category.id}/edit`}
                    className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                  >
                    <Pencil className="size-4" />
                    <span className="sr-only">Edit {category.label}</span>
                  </Link>
                </div>
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
