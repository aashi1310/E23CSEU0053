import React from 'react';
import { Box } from '@mui/material';
import NotificationCard from './NotificationCard';
import type { Notification } from '../types';
import EmptyState from './common/EmptyState';
import NotificationSkeleton from './common/NotificationSkeleton';

interface NotificationListProps {
  notifications: Notification[];
  loading?: boolean;
  onNotificationClick?: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, loading, onNotificationClick }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <NotificationSkeleton key={`skeleton-${i}`} />
        ))}
      </Box>
    );
  }

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
