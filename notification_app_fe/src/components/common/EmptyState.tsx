import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message = 'No notifications found' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 6,
        textAlign: 'center',
        color: 'text.secondary',
      }}
    >
      <NotificationsOffIcon sx={{ fontSize: 60, mb: 2, opacity: 0.5 }} />
      <Typography variant="h6" color="inherit">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;
