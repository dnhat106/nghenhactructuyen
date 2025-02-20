import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ExploreIcon from '@mui/icons-material/Explore';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CategoryIcon from '@mui/icons-material/Category';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import logo from '../assets/logo.svg';

const menuItems = [
  { text: 'Thư Viện', icon: <LibraryMusicIcon />, path: '/library' },
  { text: 'Khám Phá', icon: <ExploreIcon />, path: '/explore' },
  { text: 'BXH Nhạc Mới', icon: <ShowChartIcon />, path: '/new-music' },
  { text: 'Chủ Đề & Thể Loại', icon: <CategoryIcon />, path: '/#categories' },
  { text: 'Top 100', icon: <FormatListNumberedIcon />, path: '/top-100' },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: '#231B2E',
        color: 'white',
        position: 'fixed',
        left: 0,
        top: 0,
        p: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Music App
        </Typography>
      </Box>

      {/* Menu Items */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                '& .MuiListItemText-primary': { 
                  fontSize: '0.9rem',
                  fontWeight: 500
                } 
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
