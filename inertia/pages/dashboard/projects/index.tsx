import { Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import { ProjectCard } from '~/components/pages/projects/project-card'
import { buttonVariants } from '~/components/ui/button'
import type { InertiaProps } from '~/types'
import { Project } from '~/types/models/project'

export default function DashboardProjectsIndex({
  user,
  projects,
}: InertiaProps<{
  projects: any | Project[]
}>) {
  return (
    <>
      <Head title="Projects" />
      <section className="w-full h-screen">
        <div className="font-semibold flex h-16 items-center justify-between border-b px-4 bg-sidebar">
          <h2 className="text-xl">Projects</h2>
          <Link href="/dashboard/projects/new" className={buttonVariants({ variant: 'default' })}>
            <Plus />
            <span>Project</span>
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 p-4">
          {projects.map((project: Project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>
    </>
  )
}
