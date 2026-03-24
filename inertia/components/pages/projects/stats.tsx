import { FolderClock, FolderLock, FolderOpen } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'

type DashboardStatsProps = {
  stats: {
    totalProjects: number
    personalProjects: number
    maintainedProjects: number
  }
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <section className="grid gap-4 sm:grid-cols-4 p-4">
      {[
        {
          label: 'Projects',
          projects: stats.totalProjects,
          copy: 'Total Projects in your portfolio',
          icon: FolderOpen,
        },
        {
          label: 'Personal',
          projects: stats.personalProjects,
          copy: 'Projects flagged as personal work',
          icon: FolderLock,
        },
        {
          label: 'Maintained',
          projects: stats.maintainedProjects,
          copy: 'Projects still under maintenance',
          icon: FolderClock,
        },
      ].map((item) => (
        <Card key={item.label} className="md:max-w-60">
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <h4 className="text-lg">{item.label}</h4>
              <div className="bg-blue-50 dark:bg-blue-950/50 p-2 rounded-lg">
                <item.icon className="text-blue-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold tracking-tight">{item.projects}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">{item.copy}</p>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
