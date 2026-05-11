import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'All Notifications', path: '/' },
    { label: 'Priority Inbox', path: '/priority' },
  ];

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <NotificationsIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Notifier
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              onClick={() => navigate(item.path)}
              sx={{ 
                color: '#fff', 
                mx: 1,
                borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                borderRadius: 0,
                opacity: location.pathname === item.path ? 1 : 0.7,
                '&:hover': {
                  opacity: 1
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
