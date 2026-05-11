import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { NotificationType } from '../types';

interface FilterBarProps {
  currentFilter: NotificationType;
  onFilterChange: (filter: NotificationType) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, onFilterChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: NotificationType) => {
    onFilterChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs 
        value={currentFilter} 
        onChange={handleChange} 
        aria-label="notification type filters"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="All" value="All" />
        <Tab label="Events" value="Event" />
        <Tab label="Results" value="Result" />
        <Tab label="Placements" value="Placement" />
      </Tabs>
    </Box>
  );
};

export default FilterBar;
