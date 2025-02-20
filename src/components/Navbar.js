import React from 'react';
import { AppBar, Box, Toolbar, Button, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
      <Toolbar sx={{ gap: 2 }}>
        <SearchBar />

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <RouterLink to="/profile" style={{ textDecoration: 'none' }}>
              <Button 
                startIcon={
                  <Avatar 
                    src={user.photoURL} 
                    sx={{ width: 24, height: 24 }}
                  >
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </Avatar>
                }
                sx={{ color: 'text.primary' }}
              >
                {user.displayName || user.email}
              </Button>
            </RouterLink>
            <Button 
              color="primary" 
              onClick={logout}
              variant="outlined"
            >
              Đăng xuất
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <RouterLink to="/login" style={{ textDecoration: 'none' }}>
              <Button color="primary" variant="outlined">Đăng nhập</Button>
            </RouterLink>
            <RouterLink to="/register" style={{ textDecoration: 'none' }}>
              <Button color="primary" variant="contained">Đăng ký</Button>
            </RouterLink>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
