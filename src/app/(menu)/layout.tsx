'use client'

import { Box, PaletteMode, useMediaQuery } from "@mui/material"
import { MainMenu } from '@/components'
import { useContext, useEffect, useState } from "react"
import { ColorModeContext, UserContext } from "@/contexts"
import { useRouter } from "next/navigation"
import { SnackbarContext } from "@/contexts/snackbar-context"
import { IAugmentedSnackbarProps } from "@/definitions"
import { AlertSnackbar } from "@/components/AlertSnackbar"


export default function MenuLayout(props: { children: React.ReactNode }) {
  const router = useRouter()
  const { user } = useContext(UserContext)

  const colorContext = useContext(ColorModeContext)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const [snackbarProps, setSnackbarProps] = useState<IAugmentedSnackbarProps>({ open: false, message: '', title: '', severity: 'error' })
  const snackbarValue = { snackbarProps, setSnackbarProps }

  useEffect(() => {
    if (colorContext.mode !== localStorage.getItem('COLOR_THEME')) {
      localStorage.setItem('COLOR_THEME', colorContext.mode)
    }
  }, [colorContext.mode, colorContext])

  useEffect(() => {
    const storageMode = typeof window !== 'undefined' && (window?.localStorage.getItem('COLOR_THEME') as PaletteMode)
    const theme = storageMode || 'light'
    colorContext.setColorMode(theme as PaletteMode)
  }, [prefersDarkMode, colorContext])

  useEffect(() => {
    if (user === null) {
      router.push('/')
    }
  })

  function handleLogout() {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleSnackbarClose = () => {
    setSnackbarProps({ ...snackbarProps, open: false })
  }

  // TODO: loading states
  // TODO: more robust error handling
  // TODO: breadcrumbs
  return (
    <SnackbarContext.Provider value={snackbarValue}>
      <Box display={'flex'} sx={{ height: '100vh', width: '100%' }}>
        <MainMenu handleLogout={handleLogout} />
        <Box sx={{ p: 2, width: '100%', height: '100%' }}>{props.children}</Box>
      </Box>
      <AlertSnackbar {...snackbarProps} onClose={handleSnackbarClose} />
    </SnackbarContext.Provider>
  )
}