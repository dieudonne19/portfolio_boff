import { Link } from '@adonisjs/inertia/react'
import { Folder, GaugeIcon, Network } from 'lucide-react'

export const LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: GaugeIcon },
  { label: 'Projects', href: '/dashboard/projects', icon: Folder },
  { label: 'Categories', href: '/dashboard/project-categories/new', icon: Network },
]

export const Navigation = () => {
  return (
    <div className="w-full">
      <ul className="flex items-center justify-center w-full gap-8">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="active:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
