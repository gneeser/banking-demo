import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

interface DeleteModalProps {
  deleteDialogOpen: boolean
  setDeleteDialogOpen: (open: boolean) => void
  handleDelete: () => void
  name: string
}

export function DeleteModal({ deleteDialogOpen, setDeleteDialogOpen, handleDelete, name }: DeleteModalProps) {
  return (
    <Dialog open={deleteDialogOpen}>
      <DialogTitle>Delete "{name}?"</DialogTitle>
      <DialogContent dividers>
        <Typography variant='body1'>Are you sure you want to delete this query?</Typography>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
        <Button color='error' onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}