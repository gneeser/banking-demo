'use client'

import { Roboto } from 'next/font/google'
import { createTheme, PaletteMode, Theme, useMediaQuery } from '@mui/material'
import { indigo, grey, blueGrey } from '@mui/material/colors'
import { ButtonProps, lighten } from '@mui/material'
import { useMemo, useState } from 'react'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const palette = {
  primary: {
    main: indigo[500]
  },
  secondary: {
    main: blueGrey[500]
  },
  background: {
    default: grey[50]
  }
}

const typography = {
  fontFamily: roboto.style.fontFamily,
}

const components = {
  MuiButton: {
    defaultProps: {
      variant: 'contained' as const,
    },
    styleOverrides: {
      root: ({ theme, ownerState }: { theme: Theme; ownerState: ButtonProps }) => {
        const { color = 'primary', variant = 'contained' } = ownerState
        if (color === 'inherit') return
        const palette = theme.palette[color]
        return theme.unstable_sx({
          '&:disabled': {
            color: palette.contrastText,
            backgroundColor: lighten(palette.main, 0.5),
          },
        })
      },
    },
  },
}

//enable theme switching
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...palette,
    ...(mode === 'dark' ? {
      background: {
        default: grey[800]
      }
    } : {})
  },
  typography: typography,
  components: components,
})

export function useColorModeAndTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const storageMode = typeof window !== 'undefined' && window?.localStorage.getItem('COLOR_THEME') as PaletteMode
  const initMode = storageMode || (prefersDarkMode ? 'dark' : 'light')

  const [mode, setMode] = useState<PaletteMode>(initMode)

  const colorMode = useMemo(
    () => ({
      setColorMode: (colorMode: PaletteMode) => setMode(colorMode),
      mode,
    }),
    [mode]
  )

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  return { colorMode, theme }
}