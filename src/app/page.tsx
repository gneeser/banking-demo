'use client'

import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  // mock out auth & auth
  function handleLogin() {
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'User', email: 'user@email.com' }))
    router.push('/home')
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js App Router example in TypeScript
        </Typography>
        <Button onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  )
}
