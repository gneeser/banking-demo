import { SnackbarProps } from '@mui/material'

export interface IAugmentedSnackbarProps extends SnackbarProps {
  severity: 'error' | 'success' | 'warning' | 'info'
}