import { Link } from '@adonisjs/inertia/react'
import { ExternalLink, Menu, Plus } from 'lucide-react'
import { buttonVariants } from '~/components/ui/button'

export const DashboardHeader = () => {
  return (
    <div className="w-full h-16 border-b bg-sidebar sticky top-0 left-0">
      <div className="h-full w-full flex items-center gap-4 justify-between px-4">
        <div className="h-full w-fit flex items-center gap-4 justify-start">
          <h4 className="font-semibold">Dashboard</h4>
        </div>
        <div className="h-full w-fit flex items-center gap-4 justify-start">
          <Link href="/dashboard/projects" className={buttonVariants({ variant: 'outline' })}>
            <Menu />
            <span>Manage</span>
          </Link>
          <Link href="/projects" className={buttonVariants({ variant: 'outline' })}>
            <ExternalLink />
            <span>Public page</span>
          </Link>
          <Link href="/dashboard/projects/new" className={buttonVariants({ variant: 'default' })}>
            <Plus />
            <span>Project</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
