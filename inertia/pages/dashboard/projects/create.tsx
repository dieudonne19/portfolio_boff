import { Form, Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { ChevronLeft } from 'lucide-react'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import type { InertiaProps } from '~/types'

function FieldError({ error }: { error?: string }) {
  if (!error) return null

  return <p className="text-sm text-red-600">{error}</p>
}

export default function DashboardProjectsCreate({
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
      <Head title="Upload Project" />
      <div className="h-16 sticky top-0 bg-sidebar border-b z-4 left-0 flex gap-2 items-center justify-between px-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Your Project</h2>
        </div>
        <Link href="/dashboard/projects" className={buttonVariants()}>
          <ChevronLeft />
          Projects
        </Link>
      </div>
      <section className="relative px-4 mt-4">
        <Form action="/dashboard/projects" method="post" encType="multipart/form-data">
          {({ errors, processing }) => (
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="Boff Portfolio Redesign" />
                    <FieldError error={errors.title} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the challenge, the visual direction and the delivery impact."
                      className="min-h-36"
                    />
                    <FieldError error={errors.description} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Card Size</Label>
                    <Select name="size" defaultValue="medium">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Project size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError error={errors.size} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stack">Stack</Label>
                    <Input
                      id="stack"
                      name="stack"
                      placeholder="AdonisJS, Inertia, React, Cloudinary"
                    />
                    <FieldError error={errors.stack} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label htmlFor="projectCategoryId">Category</Label>
                      <Link
                        href="/dashboard/project-categories/new"
                        className="text-xs font-medium text-amber-800 underline-offset-4 hover:underline"
                      >
                        Create category
                      </Link>
                    </div>
                    <Select name="projectCategoryId" defaultValue="">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={String(category.id)}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* <select
                      id="projectCategoryId"
                      name="projectCategoryId"
                      className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select> */}
                    <FieldError error={errors.projectCategoryId} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="link">Project Link</Label>
                    <Input id="link" name="link" type="url" placeholder="https://example.com" />
                    <FieldError error={errors.link} />
                  </div>
                </div>

                <div className="grid gap-4 rounded-[24px] border p-4 sm:grid-cols-2">
                  <label className="flex items-center gap-3 rounded-2xl border p-4">
                    <input
                      type="checkbox"
                      name="perso"
                      className="size-4 rounded border-stone-300"
                    />
                    <span>
                      <span className="block text-sm font-medium text-stone-900">
                        Personal project
                      </span>
                      <span className="block text-xs text-stone-500">
                        Mark the project as personal work.
                      </span>
                    </span>
                  </label>

                  <label className="flex items-center gap-3 rounded-2xl border bg-card p-4">
                    <input
                      type="checkbox"
                      name="maintenance"
                      className="size-4 rounded border-stone-300"
                    />
                    <span>
                      <span className="block text-sm font-medium text-stone-900">
                        In maintenance
                      </span>
                      <span className="block text-xs text-stone-500">
                        Display that the project is still maintained.
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border bg-card p-4">
                  <div className="space-y-2">
                    <Label htmlFor="presentationImage">Presentation Image</Label>
                    <Input
                      id="presentationImage"
                      name="presentationImage"
                      type="file"
                      accept="image/*"
                    />
                    <p className="text-xs text-stone-500">
                      This image is used as the main thumbnail on the project cards.
                    </p>
                    <FieldError error={errors.presentationImage} />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <div className="space-y-2">
                    <Label htmlFor="otherImages">Gallery Images</Label>
                    <Input
                      id="otherImages"
                      name="otherImages"
                      type="file"
                      accept="image/*"
                      multiple
                    />
                    <p className="text-xs text-stone-500">
                      Add extra screenshots or visual details. Order follows the selected files.
                    </p>
                    <FieldError error={errors.otherImages} />
                  </div>
                </div>

                <div className="rounded-lg border border-stone-900 bg-stone-950 p-5 text-stone-50">
                  <div className="text-xs font-semibold tracking-[0.22em]">Upload</div>
                  <p className="mt-3 text-sm text-stone-300">
                    On submit, images are uploaded to Cloudinary first, then the project and its
                    gallery records are created in PostgreSQL.
                  </p>
                  <Button type="submit" size="lg" className="mt-5 w-full" disabled={processing}>
                    {processing ? 'Uploading...' : 'Publish Project'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Form>
      </section>
    </>
  )
}
