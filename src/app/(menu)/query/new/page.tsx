'use client'

import { SnackbarContext } from "@/contexts/snackbar-context"
import { Button, Paper, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { ChangeEvent, useContext, useEffect, useState } from "react"


export default function Page() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [query, setQuery] = useState('')

  const [createValid, setCreateValid] = useState(false)
  const [nameValid, setNameValid] = useState(false)
  const [queryValid, setQueryValid] = useState(false)

  const { setSnackbarProps } = useContext(SnackbarContext)

  const handleNameValidation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value)
  }

  const handleQueryValidation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(e.target.value)
  }

  const handleCancel = () => {
    setName('')
    setQuery('')
  }

  const handleCreate = async () => {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, query, type: 'raw' })
    })
    const data = await response.json()
    if (data.error) {
      setSnackbarProps({ open: true, message: data.error.message, title: 'Error', severity: 'error' })
      return
    }
    setSnackbarProps({ open: true, message: 'Query created successfully', title: 'Success', severity: 'success' })
    router.push(`/query/${data.id}`)
  }

  useEffect(() => {
    setNameValid(name.length > 1 && name.length < 64)
  }, [name])

  useEffect(() => {
    setQueryValid(query.length > 1 && query.length < 1024)
  }, [query])

  useEffect(() => {
    setCreateValid(nameValid && queryValid)
  }, [nameValid, queryValid])

  return (<Paper sx={{ height: '100%', width: '100%', p: 2 }}>
    <Stack spacing={3} sx={{ mb: 2 }}>
      <Typography variant='h4'>New Query</Typography>
      <TextField required label='Name' fullWidth value={name} onChange={handleNameValidation} inputProps={{ minLength: 2, maxLength: 64 }} />
      <TextField required label='Query' fullWidth multiline rows={4} value={query} onChange={handleQueryValidation} inputProps={{ minLength: 2, maxLength: 1024 }} />
    </Stack>
    <Stack spacing={1} direction='row-reverse'>
      <Button disabled={!createValid} onClick={handleCreate}>Save</Button>
      <Button color='secondary' onClick={handleCancel}>Cancel</Button>
    </Stack>
  </Paper>)
}