import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { Project } from '~/types/models/project'

export const MiniProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card key={project.id} className="overflow-hidden" aria-orientation="horizontal">
      <CardHeader>
        {project.images.presentation ? (
          <img
            src={project.images.presentation.url}
            alt={project.title}
            className="h-30 w-full object-cover"
          />
        ) : (
          <div className="flex h-44 items-center justify-center text-sm">No preview</div>
        )}
      </CardHeader>

      <CardContent>
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Badge variant="info">{project.category.label}</Badge>
        <Badge variant={'warning'}>{project.size}</Badge>
      </CardFooter>
    </Card>
  )
}
