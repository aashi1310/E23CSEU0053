import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import NotificationList from '../components/NotificationList';
import ErrorState from '../components/common/ErrorState';
import DashboardStats from '../components/DashboardStats';
import { getNotifications } from '../api/notifications';
import type { Notification } from '../types';
import { Log } from '../middleware/logger';
import { getPriorityNotifications } from '../utils/priority';

const PriorityNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dashboard stats derived state (in a real app, backend might provide these)
  const totalCount = 124; // Mocked for design
  const unreadCount = 24;
  const placementCount = 12;
  const priorityCount = 10;

  const fetchPriorityNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch a larger set to apply priority sorting over a good dataset
      // In a real app, this might be handled completely by the backend.
      const response = await getNotifications(1, 100); 
      const sortedPriority = getPriorityNotifications(response.data);
      setNotifications(sortedPriority);
      Log('frontend', 'info', 'PriorityNotifications', 'Applied sorting and loaded priority inbox');
    } catch (err: any) {
      setError('Failed to load priority notifications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriorityNotifications();
    Log('frontend', 'info', 'PriorityNotifications', 'Priority inbox loaded');
  }, []);

  const handleNotificationClick = (id: string) => {
    Log('frontend', 'info', 'PriorityNotifications', `Clicked priority notification ${id}`);
  };

  return (
    <PageContainer>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 1 }}>
        Priority Inbox
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Your top 10 most important notifications based on urgency and type.
      </Typography>
      
      <DashboardStats 
        total={totalCount} 
        unread={unreadCount} 
        placements={placementCount} 
        priorityCount={priorityCount} 
      />

      {error && <ErrorState error={error} onRetry={fetchPriorityNotifications} />}
      
      {!error && (
        <NotificationList 
          notifications={notifications} 
          loading={loading}
          onNotificationClick={handleNotificationClick} 
        />
      )}
    </PageContainer>
  );
};

export default PriorityNotifications;
