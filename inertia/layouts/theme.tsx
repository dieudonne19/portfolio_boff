'use client'

import { Moon, PanelLeft, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useMemo } from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

type ThemeToggleProps = {
  collapsed?: boolean
  onToggleSidebar?: () => void
}

export const ThemeToggle = ({ collapsed = false, onToggleSidebar }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    if (theme) {
      if (theme === 'light') setTheme('dark')
      else setTheme('light')
    }
  }, [setTheme, theme])

  const THEME = useMemo(() => {
    if (theme) {
      if (theme === 'light') return 'Light'
      else return 'Dark'
    }
  }, [theme])

  return (
    <div
      className={cn(
        'flex w-full items-center gap-2',
        collapsed ? 'flex-col justify-center' : 'justify-between'
      )}
    >
      <Button
        type="button"
        variant={collapsed ? 'ghost' : 'outline'}
        size={collapsed ? 'icon' : 'sm'}
        className={cn(
          'border-border/60 bg-background/60 backdrop-blur-sm',
          collapsed ? 'size-8' : 'flex-1 justify-start'
        )}
        onClick={toggleTheme}
      >
        {theme && theme === 'light' ? <SunDim /> : <Moon />}
        {!collapsed ? <span>{THEME}</span> : <span className="sr-only">Toggle theme</span>}
      </Button>

      <Button
        type="button"
        variant="ghost"
        size={collapsed ? 'icon' : 'icon-sm'}
        className={cn(collapsed ? 'size-8' : 'shrink-0')}
        onClick={onToggleSidebar}
      >
        <PanelLeft />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    </div>
  )
}
