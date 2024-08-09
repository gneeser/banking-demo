'use client'

import { Box, Button, Card, Stack, Typography } from "@mui/material"
import { ColorModeContext } from '@/contexts'
import { useContext } from "react"


export default function Page() {
  const { mode, setColorMode } = useContext(ColorModeContext)

  return (
    <Box sx={{ p: 2, height: '100%', width: '100%' }}>
      <Typography variant='h4' sx={{ mb: 2 }}>Settings</Typography>
      <Card sx={{ p: 2 }}>
        <Typography variant='h6'>Color Mode</Typography>
        <Typography>Current mode: {mode}</Typography>
        <Stack spacing={2} direction='row'>
          <Button onClick={() => setColorMode('light')}>Light</Button>
          <Button onClick={() => setColorMode('dark')}>Dark</Button>
        </Stack>
      </Card>
    </Box>
  )
}