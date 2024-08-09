import { createContext } from 'react'

import { IAugmentedSnackbarProps } from '@/definitions'

interface ISnackbarPropsContext {
  snackbarProps: IAugmentedSnackbarProps | undefined
  setSnackbarProps: (snackbarProps: IAugmentedSnackbarProps) => void
}

export const SnackbarContext = createContext<ISnackbarPropsContext>({
  snackbarProps: undefined,
  setSnackbarProps: () => { },
})