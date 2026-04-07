import { Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { ProjectCard } from '~/components/pages/projects/project-card'
import { buttonVariants } from '~/components/ui/button'
import type { InertiaProps } from '~/types'
import { Project } from '~/types/models/project'

export default function ProjectsIndex({
  user,
  projects,
}: InertiaProps<{
  projects: any | Project[]
}>) {
  return (
    <>
      <Head title="Projects" />
      <main className="min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-12">
          <header className="border-b pb-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground">
                  Selected Projects
                </p>
                <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
                  Work reduced to what matters.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                  A quiet index of projects, systems and interfaces. No staging, no noise, just the
                  work and its structure.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/" className={buttonVariants({ variant: 'outline' })}>
                  Home
                </Link>
                {user ? (
                  <Link href="/dashboard" className={buttonVariants({ variant: 'default' })}>
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/login" className={buttonVariants({ variant: 'default' })}>
                    Login
                  </Link>
                )}
              </div>
            </div>
          </header>

          <section className="flex items-center justify-between border-b py-4 text-sm text-muted-foreground">
            <p>{projects.length} projects</p>
            <p>Portfolio index</p>
          </section>

          <section className="py-8">
            {projects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project: Project) => (
                  <ProjectCard project={project} key={project.id} isPublic />
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-stone-300 px-6 py-16 text-center">
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
                  No projects
                </p>
                <p className="mt-3 text-lg text-muted-foreground">
                  The portfolio is empty for now.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
