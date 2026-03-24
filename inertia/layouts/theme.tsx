'use client'

import { Moon, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useMemo } from 'react'
import { Button } from '~/components/ui/button'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = useCallback(() => {
    if (theme) {
      if (theme === 'light') setTheme('dark')
      else setTheme('light')
    }
  }, [theme])

  const THEME = useMemo(() => {
    if (theme) {
      if (theme === 'light') return 'Light'
      else return 'Dark'
    }
  }, [theme])

  return (
    <Button onClick={toggleTheme}>
      {theme && theme === 'light' ? <SunDim /> : <Moon />}
      <span>{THEME}</span>
    </Button>
  )
}
