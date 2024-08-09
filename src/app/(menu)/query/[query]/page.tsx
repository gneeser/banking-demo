'use client'

import { DeleteModal } from "@/components"
import { SnackbarContext } from "@/contexts/snackbar-context"
import { QueryInterface, IQueryResult } from "@/definitions"
import { Box, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid"
import _ from "lodash"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


export default function Page() {
  const router = useRouter()
  const params = useParams()
  const id = params.query
  const [currentQuery, setCurrentQuery] = useState<string>('')
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true)
  const [query, setQuery] = useState<QueryInterface | null>(null)
  const [queryResults, setQueryResults] = useState<IQueryResult | null>(null)
  const [querying, setQuerying] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const { setSnackbarProps } = useContext(SnackbarContext)

  const fetchQuery = async () => {
    const response = await fetch(`/api/query/${id}`)
    const data = await response.json()
    setQuery(data)
  }

  useEffect(() => {
    fetchQuery()

    return () => {
      setQuery(null)
    }
  }, [id])

  useEffect(() => {
    if (query) {
      setCurrentQuery(query.query)
      setDisableSubmit(false)
      handleSubmit(query.query)
    }
  }, [query])

  const handleValidateQuery = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentQuery(e.target.value)
    setDisableSubmit(e.target.value.length < 2 || e.target.value.length > 1024)
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/query/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: currentQuery })
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error.message)
      }
      setSnackbarProps({
        open: true, message: 'Query saved successfully', title: 'Success', severity: 'success'
      })
      fetchQuery()
    } catch (err) {
      let error = err as Error
      setSnackbarProps({ open: true, message: error?.message || 'Unknown error', title: 'Error', severity: 'error' })

    }
  }

  const handleSubmit = async (submittedQuery: string) => {
    setQuerying(true)
    try {
      const response = await fetch(`/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: submittedQuery })
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error.message)
      }
      const columns: GridColDef[] = _.map(_.keys(_.get(data, '0', {})), (key: string) => ({
        field: key,
        headerName: _.upperFirst(key)
      }))
      const rows: GridRowsProp = _.map(data, (row: Object, idx: number) => _.set(row, 'id', idx))
      setQuerying(false)
      setQueryResults({ columns, rows })
    } catch (err) {
      let error = err as Error
      setSnackbarProps({ open: true, message: error.message, title: 'Error', severity: 'error' })
    }
    setQuerying(false)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/query/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error.message)
      }
      setSnackbarProps({
        open: true, message: 'Query deleted successfully', title: 'Success', severity: 'success'
      })
      router.push('/query')
    } catch (err) {
      let error = err as Error
      setSnackbarProps({ open: true, message: error?.message || 'Unknown error', title: 'Error', severity: 'error' })
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <Card>
          <CardHeader title={query?.name} />
          <CardContent>
            <TextField label='Query' fullWidth multiline rows={4} value={currentQuery} onChange={handleValidateQuery} inputProps={{ minLength: 2, maxLength: 1024 }} />
          </CardContent>
          <Box sx={{ p: 2 }}>
            <Stack spacing={1} direction='row' justifyContent={'space-between'}>
              <Button color='error' variant="text" onClick={() => setDeleteDialogOpen(true)} sx={{ marginLeft: '0 auto' }}>Delete</Button>
              <Stack spacing={1} direction='row'>
                <Button color='secondary' disabled={query?.query === currentQuery} onClick={() => setCurrentQuery(query?.query || '')}>Reset</Button>
                <Button disabled={query?.query === currentQuery || disableSubmit} onClick={handleSave}>Save</Button>
                <Button disabled={disableSubmit} onClick={() => handleSubmit(currentQuery)}>Submit</Button>
              </Stack>
            </Stack>
          </Box>
        </Card>
        <Card sx={{ height: '600px' }}>
          {/* TODO: evenly space columns */}
          <DataGrid
            sx={{ maxWidth: '100%', height: '100%' }}
            loading={querying}
            columns={queryResults?.columns || []}
            rows={queryResults?.rows}
          />
        </Card>
      </Stack>
      <DeleteModal deleteDialogOpen={deleteDialogOpen} setDeleteDialogOpen={setDeleteDialogOpen} handleDelete={handleDelete} name={query?.name || ''} />
    </>
  )
}