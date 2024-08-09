import { createContext } from "react"
import { PaletteMode } from "@mui/material"

interface IColorModeContext {
  mode: PaletteMode
  setColorMode: (colorMode: PaletteMode) => void
}

export const ColorModeContext = createContext<IColorModeContext>({
  mode: 'light',
  setColorMode: () => { },
})