'use client'

import { Divider, Drawer, ListItemIcon, ListItemText, MenuItem, MenuList, Stack, Typography } from "@mui/material"
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import NextLink from 'next/link'

interface MainMenuProps {
  handleLogout: () => void
}

export function MainMenu({ handleLogout }: MainMenuProps) {
  return (
    <Drawer variant='permanent' sx={{ width: '10rem', backgroundColor: 'primary.main' }} PaperProps={{ sx: { width: '10rem', backgroundColor: 'primary.main', p: 1 } }}>
      <Typography variant='h6' sx={{ color: 'primary.contrastText' }}>Menu</Typography>
      <Stack height='100%' justifyContent={'space-between'}>
        <MenuList sx={{ color: 'common.white' }}>
          <MenuItem href="/query" component={NextLink}>
            <ListItemIcon>
              <QueryStatsIcon sx={{ color: 'primary.contrastText' }} fontSize="small" />
            </ListItemIcon>
            <ListItemText>All Queries</ListItemText>
          </MenuItem>
          <MenuItem href="/query/new" component={NextLink}>
            <ListItemIcon sx={{ color: 'common.white' }}>
              <QueryBuilderIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>New Query</ListItemText>
          </MenuItem>
        </MenuList>
        <MenuList sx={{ color: 'primary.contrastText' }}>
          <Divider sx={{ borderColor: 'primary.light' }} />
          <MenuItem href="/settings" component={NextLink}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Stack>
    </Drawer>
  )
}