import React from 'react';
import { Box, Alert, AlertTitle, Button } from '@mui/material';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert severity="error" action={onRetry && <Button color="inherit" size="small" onClick={onRetry}>Retry</Button>}>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Box>
  );
};

export default ErrorState;
