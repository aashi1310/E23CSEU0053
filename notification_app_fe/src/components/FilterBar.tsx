import React from 'react';
import { Tabs, Tab, Box, useTheme, Typography } from '@mui/material';
import type { NotificationType } from '../types';

interface FilterBarProps {
  currentFilter: NotificationType;
  onFilterChange: (filter: NotificationType) => void;
  orientation?: 'horizontal' | 'vertical';
}

const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, onFilterChange, orientation = 'horizontal' }) => {
  const theme = useTheme();
  
  const handleChange = (_event: React.SyntheticEvent, newValue: NotificationType) => {
    onFilterChange(newValue);
  };

  const isDark = theme.palette.mode === 'dark';
  const isVertical = orientation === 'vertical';

  return (
    <Box sx={{ mb: isVertical ? 0 : 4, height: '100%' }}>
      {isVertical && (
        <Typography variant="subtitle2" sx={{ mb: 2, ml: 1, color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Filters
        </Typography>
      )}
      <Tabs 
        value={currentFilter} 
        onChange={handleChange} 
        orientation={orientation}
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
              justifyContent: isVertical ? 'flex-start' : 'center',
              px: 3,
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
