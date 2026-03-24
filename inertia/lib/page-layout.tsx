import { Data } from '@generated/data'
import { ReactElement, useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import { SidebarProvider } from '~/components/ui/sidebar'
import { TooltipProvider } from '~/components/ui/tooltip'
import { AppSidebar } from '~/layouts/app-sidebar'

type PageElement = ReactElement<Data.SharedProps>

function DashboardLayout({ children }: { children: PageElement }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-[calc(100vh-16rem)] w-full">{children}</main>
    </SidebarProvider>
  )
}

function PublicLayout({ children }: { children: PageElement }) {
  return children
}

function isDashboardPage(name: string) {
  return name === 'dashboard' || name.startsWith('dashboard/')
}

export function PageLayout({ name, children }: { name: string; children: PageElement }) {
  useEffect(() => {
    toast.dismiss()
  }, [name])

  if (children.props.flash.error) {
    toast.error(children.props.flash.error)
  }

  if (children.props.flash.success) {
    toast.success(children.props.flash.success)
  }

  const Layout = isDashboardPage(name) ? DashboardLayout : PublicLayout

  return (
    <TooltipProvider>
      <Layout>{children}</Layout>
      <Toaster position="top-center" richColors />
    </TooltipProvider>
  )
}
