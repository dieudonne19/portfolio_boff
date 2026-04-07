import { Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { ChevronLeft } from 'lucide-react'
import { ProjectCategoryForm } from '~/components/pages/dashboard/project-category-form'
import { buttonVariants } from '~/components/ui/button'
import type { InertiaProps } from '~/types'

export default function DashboardProjectCategoriesEdit({
  category,
  categories,
}: InertiaProps<{
  category: {
    id: number
    name: string
    label: string
  }
  categories: {
    id: number
    name: string
    label: string
  }[]
}>) {
  return (
    <>
      <Head title={`Edit ${category.label}`} />
      <div className="grid gap-8 p-4 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="bg-card p-4">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Edit category</h2>
              <p className="mt-1 text-sm text-stone-500">
                Update the backend name or the UI label.
              </p>
            </div>
            <Link
              href="/dashboard/project-categories/new"
              className={buttonVariants({ variant: 'outline' })}
            >
              <ChevronLeft />
              <span>Back</span>
            </Link>
          </div>

          <ProjectCategoryForm
            action={`/dashboard/project-categories/${category.id}`}
            method="put"
            submitLabel="Save changes"
            submittingLabel="Saving..."
            defaults={category}
          />
        </section>

        <section className="bg-card p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                Existing categories
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Current library</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {categories.map((item) => (
              <article
                key={item.id}
                className={[
                  'rounded-lg border py-2 px-4',
                  item.id === category.id
                    ? 'border-stone-900 bg-stone-900 text-stone-50'
                    : 'border-stone-200 bg-stone-50',
                ].join(' ')}
              >
                <div className="text-lg font-semibold">{item.label}</div>
                <div
                  className={[
                    'mt-1 text-sm',
                    item.id === category.id ? 'text-stone-300' : 'text-stone-500',
                  ].join(' ')}
                >
                  {item.name}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
