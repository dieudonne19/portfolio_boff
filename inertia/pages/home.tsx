import { Link } from '@adonisjs/inertia/react'
import { Head } from '@inertiajs/react'
import { buttonVariants } from '~/components/ui/button'

export default function Home() {
  return (
    <>
      <Head title="Home" />
      <main className="min-h-screen bg-stone-50 text-stone-950">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-12">
          <header className="flex items-center justify-between border-b border-stone-200 pb-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-stone-500">
              Portfolio
            </p>
            <nav className="flex items-center gap-3">
              <Link href="/projects" className={buttonVariants({ variant: 'ghost' })}>
                Projects
              </Link>
              <Link href="/login" className={buttonVariants({ variant: 'outline' })}>
                Login
              </Link>
            </nav>
          </header>

          <section className="flex flex-1 items-center py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-stone-500">
                Selected Work
              </p>
              <h1 className="mt-5 max-w-2xl text-5xl font-semibold tracking-[-0.05em] text-balance sm:text-7xl">
                A quiet place for finished work.
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">
                Projects gathered with restraint. Clear, direct, and reduced to their essential
                form.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/projects" className={buttonVariants({ size: 'lg' })}>
                  View Projects
                </Link>
                <Link href="/dashboard" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                  Dashboard
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
