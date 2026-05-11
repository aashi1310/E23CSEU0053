import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import WorkIcon from '@mui/icons-material/Work';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface DashboardStatsProps {
  total: number;
  unread: number;
  placements: number;
  priorityCount: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ total, unread, placements, priorityCount }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const stats = [
    { label: 'Total Notifications', value: total, icon: <NotificationsIcon />, color: '#3b82f6' }, // blue
    { label: 'Unread Alerts', value: unread, icon: <MarkEmailUnreadIcon />, color: '#ef4444' }, // red
    { label: 'Placement Alerts', value: placements, icon: <WorkIcon />, color: '#10b981' }, // green
    { label: 'Priority Count', value: priorityCount, icon: <PriorityHighIcon />, color: '#f59e0b' }, // amber
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
      {stats.map((stat, idx) => (
        <Paper
          key={idx}
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDark ? '0 10px 15px -3px rgba(0,0,0,0.5)' : '0 10px 15px -3px rgba(0,0,0,0.05)',
            }
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: `${stat.color}15`,
              color: stat.color,
            }}
          >
            {stat.icon}
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {stat.value}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              {stat.label}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default DashboardStats;
