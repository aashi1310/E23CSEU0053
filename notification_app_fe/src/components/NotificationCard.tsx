import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Badge } from '@mui/material';
import { Notification } from '../types';

interface NotificationCardProps {
  notification: Notification;
  onClick?: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onClick }) => {
  const getChipColor = (type: string) => {
    switch (type) {
      case 'Placement': return 'error';
      case 'Result': return 'warning';
      case 'Event': return 'info';
      default: return 'default';
    }
  };

  const formattedDate = new Date(notification.timestamp).toLocaleString();

  return (
    <Card 
      onClick={() => onClick && onClick(notification.id)}
      sx={{ 
        mb: 2, 
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: 2,
        boxShadow: notification.read ? 1 : 3,
        bgcolor: notification.read ? 'background.paper' : 'action.hover',
        transition: '0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: onClick ? 'translateY(-2px)' : 'none'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!notification.read && <Badge color="primary" variant="dot" sx={{ mr: 1 }} />}
            <Typography variant="h6" component="div" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
              {notification.title}
            </Typography>
          </Box>
          <Chip size="small" label={notification.type} color={getChipColor(notification.type) as any} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {notification.message}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
