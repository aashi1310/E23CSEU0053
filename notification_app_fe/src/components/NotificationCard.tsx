import React from 'react';
import { Card, CardContent, Typography, Chip, Box, useTheme } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsIcon from '@mui/icons-material/Notifications';
import type { Notification } from '../types';

interface NotificationCardProps {
  notification: Notification;
  onClick?: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onClick }) => {
  const theme = useTheme();
  
  const getIconAndColor = (type: string) => {
    switch (type) {
      case 'Placement': return { icon: <WorkIcon fontSize="small" />, color: 'error' };
      case 'Result': return { icon: <SchoolIcon fontSize="small" />, color: 'warning' };
      case 'Event': return { icon: <CalendarTodayIcon fontSize="small" />, color: 'info' };
      default: return { icon: <NotificationsIcon fontSize="small" />, color: 'default' };
    }
  };

  const { icon, color } = getIconAndColor(notification.type);
  const formattedDate = new Date(notification.timestamp).toLocaleString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <Card 
      onClick={() => onClick && onClick(notification.id)}
      sx={{ 
        mb: 2, 
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: 4,
        borderLeft: !notification.read ? `5px solid ${theme.palette.primary.main}` : '5px solid transparent',
        boxShadow: theme.palette.mode === 'dark' ? '0 4px 6px -1px rgba(0, 0, 0, 0.5)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        bgcolor: 'background.paper',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: onClick ? 'translateY(-3px)' : 'none',
          boxShadow: theme.palette.mode === 'dark' ? '0 10px 15px -3px rgba(0, 0, 0, 0.7)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: `${color}.main` + '15',
                color: `${color}.main`,
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: notification.read ? 600 : 700, lineHeight: 1.2 }}>
                {notification.title}
                {!notification.read && (
                  <Box component="span" sx={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', ml: 1, verticalAlign: 'middle' }} />
                )}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                {formattedDate}
              </Typography>
            </Box>
          </Box>
          <Chip size="small" label={notification.type} color={color as any} sx={{ fontWeight: 600, borderRadius: '6px' }} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 6.5, lineHeight: 1.6 }}>
          {notification.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
