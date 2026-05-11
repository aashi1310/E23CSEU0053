import React from 'react';
import { Tabs, Tab, Box, useTheme } from '@mui/material';
import type { NotificationType } from '../types';

interface FilterBarProps {
  currentFilter: NotificationType;
  onFilterChange: (filter: NotificationType) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, onFilterChange }) => {
  const theme = useTheme();
  
  const handleChange = (_event: React.SyntheticEvent, newValue: NotificationType) => {
    onFilterChange(newValue);
  };

  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ mb: 4 }}>
      <Tabs 
        value={currentFilter} 
        onChange={handleChange} 
        aria-label="notification type filters"
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{
          minHeight: 40,
          '& .MuiTabs-flexContainer': {
            gap: 1,
          }
        }}
      >
        {['All', 'Event', 'Result', 'Placement'].map((type) => (
          <Tab 
            key={type}
            label={type === 'All' ? 'All' : `${type}s`} 
            value={type} 
            sx={{
              minHeight: 36,
              height: 36,
              borderRadius: '999px',
              bgcolor: currentFilter === type 
                ? 'primary.main' 
                : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
              color: currentFilter === type 
                ? '#fff !important' 
                : 'text.primary',
              '&:hover': {
                bgcolor: currentFilter === type 
                  ? 'primary.dark' 
                  : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'),
              }
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default FilterBar;
