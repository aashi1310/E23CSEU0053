import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Snackbar, Alert } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import NotificationList from '../components/NotificationList';
import DashboardStats from '../components/DashboardStats';
import { getNotifications } from '../api/notifications';
import type { Notification } from '../types';
import { Log } from '../middleware/logger';
import { getPriorityNotifications } from '../utils/priority';
import { mockNotifications } from '../utils/mockData';

const PriorityNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const totalCount = 124; 
  const unreadCount = 24;
  const placementCount = 12;
  const priorityCount = 10;

  const fetchPriorityNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications(1, 100); 
      const sortedPriority = getPriorityNotifications(response.data);
      setNotifications(sortedPriority);
      Log('frontend', 'info', 'PriorityNotifications', 'Applied sorting and loaded priority inbox');
    } catch (err: any) {
      Log('frontend', 'error', 'api', 'Failed to fetch priority notifications');
      
      // Fallback to mock data
      const sortedPriorityMock = getPriorityNotifications(mockNotifications);
      setNotifications(sortedPriorityMock);
      
      setSnackbarMessage('Using demo notifications due to server issue.');
      setSnackbarOpen(true);
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
    
    // Optimistic unread toggle
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <PageContainer>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 1 }}>
          Priority Inbox
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Your top most important notifications based on urgency and type.
        </Typography>
        
        <DashboardStats 
          total={totalCount} 
          unread={unreadCount} 
          placements={placementCount} 
          priorityCount={priorityCount} 
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ position: { md: 'sticky' }, top: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, ml: 1, color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Insights
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1, lineHeight: 1.6 }}>
                The priority inbox uses a custom algorithm to surface your most critical updates first, starting with Placement alerts, followed by Results and Events.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <NotificationList 
              notifications={notifications} 
              loading={loading}
              onNotificationClick={handleNotificationClick} 
            />
          </Grid>
        </Grid>
      </Box>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default PriorityNotifications;
