import { createContext } from 'react'

import { UserInterface } from '@/definitions'

interface IUserContext {
  user: UserInterface | null | undefined
  setUser: (user: UserInterface | null | undefined) => void
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => { },
})