import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

export default function Alerts({ title, icon, description, color = 'primary' }) {
  const handleReload = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <Alert
      sx={{ alignItems: 'flex-start' }}
      startDecorator={icon}
      variant="soft"
      color={color}
      endDecorator={
        <IconButton variant="soft" color={color} onClick={handleReload}>
          <CloseRoundedIcon />
        </IconButton>
      }
    >
      <div>
        <Typography level="h6" fontWeight="bold" color={color}>
          {title}
        </Typography>
        {description && (
          <Typography level="body-sm" color={color}>
            {description}
          </Typography>
        )}
      </div>
    </Alert>
  );
}
