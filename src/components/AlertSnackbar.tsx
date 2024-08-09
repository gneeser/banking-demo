import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { IAugmentedSnackbarProps } from '@/definitions'

export function AlertSnackbar(props: IAugmentedSnackbarProps) {
  const { severity, message, open, onClose, autoHideDuration } = props

  const handleCloseButton = () => {
    if (onClose) onClose(new Event('onClose'), 'clickaway')
  }

  return (
    <Snackbar
      sx={{ maxWidth: '400px' }}
      open={open}
      autoHideDuration={autoHideDuration || 6000}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={severity}
        variant="standard"
        onClose={handleCloseButton}
      >
        <AlertTitle>
          {props.title}
        </AlertTitle>
        {props.message}
      </Alert>
    </Snackbar >
  )
}