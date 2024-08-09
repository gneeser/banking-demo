'use client'

import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default function Page() {
  const [queries, setQueries] = useState([])


  // TODO: pagination
  const fetchQueries = async () => {
    const response = await fetch('/api/query')
    const data = await response.json()
    if (data.error) {
      alert(data.error?.message)
      return
    }
    setQueries(data)
  }

  useEffect(() => {
    fetchQueries()

    return () => {
      setQueries([])
    }
  }, [])

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h4' sx={{ mb: 2 }}>All Queries</Typography>
      <Grid container spacing={2}>
        {queries.map((query: any, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Card sx={{ p: 1, height: '200px' }}>
                <CardActionArea sx={{ height: '100%', weight: '100%' }} href={`/query/${query.id}`}>
                  <CardHeader sx={{ p: 1 }} titleTypographyProps={{
                    sx: {
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }
                  }} title={query.name} />
                  <CardContent>
                    <Typography
                      sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                      }}
                      variant="body2"
                    >
                      {query.query}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}