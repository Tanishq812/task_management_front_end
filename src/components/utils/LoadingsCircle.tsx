import { Box, CircularProgress } from '@mui/joy'
import React from 'react'

export default function LoadingsCircle() {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><CircularProgress variant="soft" /></Box>
            
  )
}
