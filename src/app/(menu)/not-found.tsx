import { Alert, Button, Card, Container, Stack, Typography } from "@mui/material"
import NextLink from 'next/link'


export default function NotFound() {
  return (<Container maxWidth="lg">
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
        Error Encountered
      </Typography>
      <Alert sx={{ mb: 2 }} severity="error">404 - Page Not Found</Alert>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button variant="contained" color="primary" href="/home" LinkComponent={NextLink}>
          Return Home
        </Button>
      </Stack>
    </Card>
  </Container >)
}