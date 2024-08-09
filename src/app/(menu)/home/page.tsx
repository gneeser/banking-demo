'use client'

import { Button, Card, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'

export default function Page() {
  return (
    <Card
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Welcome, User!
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button href="/query" LinkComponent={NextLink}>
          View saved queries
        </Button>
        <Button href="/query/new" LinkComponent={NextLink}>
          Create a new query
        </Button>
      </Stack>
    </Card>
  )
}