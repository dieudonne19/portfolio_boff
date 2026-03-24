import { Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { DashboardHeader } from '~/components/pages/projects/header'
import { MiniProjectCard } from '~/components/pages/projects/mini-project-card'
import { DashboardStats } from '~/components/pages/projects/stats'
import { buttonVariants } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import type { InertiaProps } from '~/types'
import { Project } from '~/types/models/project'

export default function Dashboard({
  user,
  stats,
  recentProjects,
}: InertiaProps<{
  stats: {
    totalProjects: number
    personalProjects: number
    maintainedProjects: number
  }
  recentProjects: any | Project[]
}>) {
  return (
    <>
      <Head title="Dashboard" />

      <div className="">
        <DashboardHeader />
        <DashboardStats stats={stats} />
      </div>

      <Separator />

      <section className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="font-semibold">Recent Projects</div>

          <Link href="/dashboard/projects" className={buttonVariants({ variant: 'outline' })}>
            See All
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recentProjects.map((project: Project) => (
            <MiniProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>
    </>
  )
}
