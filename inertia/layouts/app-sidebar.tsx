import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { LogOut, Plus } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar'
import { cn } from '~/lib/utils'
import { Logo } from './logo'
import { LINKS } from './navigation'
import { ThemeToggle } from './theme'

export function AppSidebar() {
  const { url } = usePage()
  const { state, isMobile, toggleSidebar } = useSidebar()
  const isCollapsed = !isMobile && state === 'collapsed'

  const isLinkActive = (href: string) => {
    if (href === '/dashboard') {
      return url === href
    }

    return url === href || url.startsWith(`${href}/`)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {LINKS.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild isActive={isLinkActive(link.href)}>
                    <Link
                      href={link.href}
                      className={cn([!isLinkActive(link.href) && 'opacity-40'])}
                    >
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className={cn(
          'border-t border-sidebar-border/60 pt-3 transition-all duration-200',
          isCollapsed ? 'items-center px-1.5' : 'px-2'
        )}
      >
        <div
          className={cn(
            'w-full rounded-xl backdrop-blur-sm transition-all duration-200',
            isCollapsed ? 'px-1.5 py-2' : 'px-2.5 py-3'
          )}
        >
          <div className={cn('w-full', isCollapsed ? 'space-y-2' : 'space-y-3')}>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isCollapsed ? 'h-0 opacity-0' : 'h-auto opacity-100'
              )}
              aria-hidden={isCollapsed}
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-sidebar-foreground/45">
                Workspace
              </p>
              <p className="mt-1 text-sm font-medium text-sidebar-foreground">Portfolio admin</p>
              <p className="text-xs text-sidebar-foreground/60">
                Manage projects, categories and display preferences.
              </p>
            </div>

            <ThemeToggle collapsed={isCollapsed} onToggleSidebar={toggleSidebar} />
          </div>
        </div>

        <SidebarMenu className={cn('w-full', isCollapsed ? 'mt-2' : 'mt-3 space-y-1')}>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link method="post" href="/logout">
                <LogOut />
                <span>{isCollapsed ? 'Sign out' : 'Logout'}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
