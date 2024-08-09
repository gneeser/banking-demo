'use client'

import * as React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { NoSsr, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useColorModeAndTheme } from '@/theme'
import { ColorModeContext, UserContext } from '@/contexts'
import { useEffect, useState } from 'react'
import { UserInterface } from '@/definitions'
import _ from 'lodash'

export default function RootLayout(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface | null | undefined>()
  const userValue = { user, setUser }

  const { colorMode, theme } = useColorModeAndTheme()

  // TODO: swap to using redux
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    } else {
      setUser(null)
    }
  }, [])

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <NoSsr >
                <CssBaseline />
                <UserContext.Provider value={userValue}>
                  {props.children}
                </UserContext.Provider>
              </NoSsr>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
