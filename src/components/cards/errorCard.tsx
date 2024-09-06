import { Box, Card, Typography } from '@mui/joy'


import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export default function errorCard({title,description}) {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Card variant="outlined" sx={{ maxWidth: 400, display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:5 }}>
        <ErrorOutlineIcon color='warning' sx={{fontSize:'3rem'}} />
        <Typography level="h2" fontSize="xl" sx={{ mb: 0.5, }}>
            {title}
        </Typography>
        <Typography sx={{color:'red'}}>
        {description}
        </Typography>
    </Card>
    </Box>
  )
}
