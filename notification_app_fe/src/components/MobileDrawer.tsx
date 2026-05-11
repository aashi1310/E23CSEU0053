import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileDrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const drawerWidth = 240;

const MobileDrawer: React.FC<MobileDrawerProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
    handleDrawerToggle();
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        Notifier
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/'} 
            onClick={() => handleNav('/')}
          >
            <ListItemIcon>
              <NotificationsIcon color={location.pathname === '/' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="All Notifications" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/priority'} 
            onClick={() => handleNav('/priority')}
          >
            <ListItemIcon>
              <InboxIcon color={location.pathname === '/priority' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Priority Inbox" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default MobileDrawer;
