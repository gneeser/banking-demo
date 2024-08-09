'use client'

import { SnackbarContext } from "@/contexts/snackbar-context"
import { QueryInterface, IQueryResult } from "@/definitions"
import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid"
import _ from "lodash"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"


export default function Page() {
  const params = useParams()
  const id = params.query
  const [currentQuery, setCurrentQuery] = useState<string>('')
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true)
  const [query, setQuery] = useState<QueryInterface | null>(null)
  const [queryResults, setQueryResults] = useState<IQueryResult | null>(null)
  const [querying, setQuerying] = useState(false)

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

  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title={query?.name} />
        <CardContent>
          <TextField label='Query' fullWidth multiline rows={4} value={currentQuery} onChange={handleValidateQuery} inputProps={{ minLength: 2, maxLength: 1024 }} />
        </CardContent>
        <CardActions sx={{ p: 2, justifyContent: 'flex-end' }}>
          <Button color='secondary' disabled={query?.query === currentQuery} onClick={() => setCurrentQuery(query?.query || '')}>Reset</Button>
          <Button disabled={query?.query === currentQuery || disableSubmit} onClick={handleSave}>Save</Button>
          <Button disabled={disableSubmit} onClick={() => handleSubmit(currentQuery)}>Submit</Button>
        </CardActions>
      </Card>
      <Card sx={{ height: '600px' }}>
        <DataGrid
          sx={{ maxWidth: '100%', height: '100%' }}
          loading={querying}
          columns={queryResults?.columns || []}
          rows={queryResults?.rows}
        />
      </Card>
    </Stack>
  )
}