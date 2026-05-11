import React, { useEffect, useState } from 'react';
import { Typography, Box, Pagination, Grid, Snackbar, Alert } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import FilterBar from '../components/FilterBar';
import NotificationList from '../components/NotificationList';
import DashboardStats from '../components/DashboardStats';
import { getNotifications } from '../api/notifications';
import type { Notification, NotificationType } from '../types';
import { Log } from '../middleware/logger';
import { mockNotifications } from '../utils/mockData';

const AllNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<NotificationType>('All');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Dashboard stats derived state
  const totalCount = 124; 
  const unreadCount = 24;
  const placementCount = 12;
  const priorityCount = 10;

  const fetchNotifications = async (currentPage: number, currentFilter: NotificationType) => {
    try {
      setLoading(true);
      const limit = 10;
      const response = await getNotifications(currentPage, limit, currentFilter);
      setNotifications(response.data);
      setTotalPages(Math.ceil(response.total / limit) || 1);
    } catch (err: any) {
      Log('frontend', 'error', 'api', 'Failed to fetch notifications');
      
      // Fallback to mock data
      let filteredMock = mockNotifications;
      if (currentFilter !== 'All') {
        filteredMock = mockNotifications.filter(n => n.type === currentFilter);
      }
      setNotifications(filteredMock);
      setTotalPages(1);
      
      setSnackbarMessage('Using demo notifications due to server issue.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(page, filter);
    Log('frontend', 'info', 'AllNotifications', `Loaded page ${page} with filter ${filter}`);
  }, [page, filter]);

  const handleFilterChange = (newFilter: NotificationType) => {
    setFilter(newFilter);
    setPage(1); 
    Log('frontend', 'info', 'AllNotifications', `Filter changed to ${newFilter}`);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    Log('frontend', 'info', 'AllNotifications', `Pagination changed to page ${value}`);
  };

  const handleNotificationClick = (id: string) => {
    Log('frontend', 'info', 'AllNotifications', `Clicked notification ${id}`);
    
    // Optimistic unread toggle
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <PageContainer>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 3 }}>
          Inbox Overview
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
              <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} orientation="vertical" />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <NotificationList 
              notifications={notifications} 
              loading={loading}
              onNotificationClick={handleNotificationClick} 
            />
            
            {!loading && notifications.length > 0 && (
              <Box sx={{ display: 'flex', mt: 4 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                  shape="rounded"
                />
              </Box>
            )}
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

export default AllNotifications;
