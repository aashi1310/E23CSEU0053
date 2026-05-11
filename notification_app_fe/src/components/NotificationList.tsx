import React from 'react';
import { Box } from '@mui/material';
import NotificationCard from './NotificationCard';
import { Notification } from '../types';
import EmptyState from './common/EmptyState';

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick?: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onNotificationClick }) => {
  if (notifications.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {notifications.map((notification) => (
        <NotificationCard 
          key={notification.id} 
          notification={notification} 
          onClick={onNotificationClick}
        />
      ))}
    </Box>
  );
};

export default NotificationList;
