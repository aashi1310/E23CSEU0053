import React from 'react';
import { Card, CardContent, Box, Skeleton, useTheme } from '@mui/material';

const NotificationSkeleton: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderRadius: 4,
        borderLeft: '5px solid transparent',
        boxShadow: theme.palette.mode === 'dark' ? '0 4px 6px -1px rgba(0, 0, 0, 0.5)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        bgcolor: 'background.paper',
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            <Skeleton variant="rounded" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="30%" height={16} />
            </Box>
          </Box>
          <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: '6px' }} />
        </Box>
        <Box sx={{ ml: 6.5 }}>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationSkeleton;
