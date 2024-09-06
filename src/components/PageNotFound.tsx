import * as React from 'react';
import { Box, Typography, Button, Container  } from '@mui/joy';
import { ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// Import your SVG icons here


function NotFound() {
const navigate= useNavigate()
  const handleHomeNavigate=()=>{
    navigate('/')
  }

  return (
    <Container component="section" maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <img src="https://th.bing.com/th/id/OIP.Bd1Dzqy9Z6Bluns0-hzVMwHaHa?w=800&h=800&rs=1&pid=ImgDetMain" alt="Not Found" style={{ borderRadius: '16px', marginBottom: 2, width:'40%' }} />
      <ErrorOutline sx={{ fontSize: '8rem', color: 'error.main', marginBottom: 2 }} />
      <Typography level='h4'  fontWeight="bold" color="primary">
        Page Not Found .
      </Typography>
      <Typography level='body-lg' color="primary">
        The page you are looking for could not be found.
      </Typography>
      <Button variant="solid" color="primary" sx={{ marginTop: 2 }} onClick={handleHomeNavigate}>
        Go Back Home
      </Button>
    </Container>
  );
}

export default NotFound;
