import { Link } from '@adonisjs/inertia/react'
import {
  ChevronsLeftRight,
  ExternalLink,
  GalleryHorizontal,
  Trash2,
  User,
  Wrench,
} from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button, buttonVariants } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { Project } from '~/types/models/project'

type ProjectCardProps = {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card key={project.id} className="overflow-hidden">
      <CardHeader>
        {project.images.presentation ? (
          <img
            src={project.images.presentation.url}
            alt={project.title}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="flex h-56 items-center justify-center">No preview image</div>
        )}
      </CardHeader>
      <CardContent className="w-full">
        <div className="w-full items-center flex justify-between">
          <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-amber-800 underline-offset-4 hover:underline"
            >
              <span>Visit</span>
              <ExternalLink className="size-3" />
            </a>
          ) : null}
        </div>
        <div>
          <p className="mt-2 text-sm leading-6 text-stone-600">{project.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <Badge variant={'pending'}>
            <ChevronsLeftRight />
            <span>{project.size}</span>
          </Badge>
          {project.perso ? (
            <Badge variant="success" className="">
              <User />
              <span>Personal</span>
            </Badge>
          ) : null}
          {project.maintenance ? (
            <Badge variant={'warning'}>
              <Wrench />
              <span>Maintenance</span>
            </Badge>
          ) : null}
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2 flex items-center gap-2">
            <div className="flex items-center gap-4">
              {/* <div className="flex items-center">
                <Code2 className="size-4" />
              </div> */}
              <Badge variant={'info'}>{project.stack}</Badge>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-end gap-2">
            <Link
              className={buttonVariants({ variant: 'outline' })}
              method="delete"
              preserveScroll
              preserveUrl
              href={`/api/projects/${project.id}`}
            >
              <Trash2 />
              Delete
            </Link>
            <Button>
              <GalleryHorizontal />
              {project.images.others.length + (project.images.presentation ? 1 : 0)} images
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
