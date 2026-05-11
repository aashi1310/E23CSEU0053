import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import NotificationList from '../components/NotificationList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import { getNotifications } from '../api/notifications';
import { Notification } from '../types';
import { Log } from '../middleware/logger';
import { getPriorityNotifications } from '../utils/priority';

const PriorityNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Priority Inbox
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Your top 10 most important notifications based on urgency and type.
      </Typography>
      
      {loading && <LoadingSpinner />}
      {error && <ErrorState error={error} onRetry={fetchPriorityNotifications} />}
      
      {!loading && !error && (
        <NotificationList 
          notifications={notifications} 
          onNotificationClick={handleNotificationClick} 
        />
      )}
    </PageContainer>
  );
};

export default PriorityNotifications;
