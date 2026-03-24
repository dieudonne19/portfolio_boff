import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { createInertiaApp } from '@inertiajs/react'
import { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { PageLayout } from '~/lib/page-layout'
import { client } from './client'
import './css/app.css'
import { ThemeProvider } from './layouts/theme-provider'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
      (page: ReactElement<Data.SharedProps>) => <PageLayout name={name} children={page} />
    )
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <TuyauProvider client={client}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <App {...props} />
        </ThemeProvider>
      </TuyauProvider>
    )
  },
  progress: {
    color: '#4B5563',
  },
})
