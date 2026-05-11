import React, { useEffect, useState } from 'react';
import { Typography, Box, Pagination } from '@mui/material';
import PageContainer from '../components/common/PageContainer';
import FilterBar from '../components/FilterBar';
import NotificationList from '../components/NotificationList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import { getNotifications } from '../api/notifications';
import { Notification, NotificationType } from '../types';
import { Log } from '../middleware/logger';

const AllNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<NotificationType>('All');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchNotifications = async (currentPage: number, currentFilter: NotificationType) => {
    try {
      setLoading(true);
      setError(null);
      const limit = 10; // Items per page
      const response = await getNotifications(currentPage, limit, currentFilter);
      setNotifications(response.data);
      setTotalPages(Math.ceil(response.total / limit) || 1);
    } catch (err: any) {
      setError('Failed to load notifications. Please try again later.');
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
    setPage(1); // Reset to first page on filter change
    Log('frontend', 'info', 'AllNotifications', `Filter changed to ${newFilter}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    Log('frontend', 'info', 'AllNotifications', `Pagination changed to page ${value}`);
  };

  const handleNotificationClick = (id: string) => {
    Log('frontend', 'info', 'AllNotifications', `Clicked notification ${id}`);
    // Optional: Add logic to mark as read or open details
  };

  return (
    <PageContainer>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        All Notifications
      </Typography>
      
      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />
      
      {loading && <LoadingSpinner />}
      {error && <ErrorState error={error} onRetry={() => fetchNotifications(page, filter)} />}
      
      {!loading && !error && (
        <>
          <NotificationList 
            notifications={notifications} 
            onNotificationClick={handleNotificationClick} 
          />
          
          {notifications.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
              />
            </Box>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default AllNotifications;
