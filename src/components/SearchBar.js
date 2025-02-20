import React, { useState } from 'react';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // TODO: Implement search functionality directly in the Home component
      console.log('Searching for:', searchTerm);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      flex: 1,
    }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton 
          onClick={handleGoBack}
          sx={{ color: 'text.secondary' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton 
          onClick={handleGoForward}
          sx={{ color: 'text.secondary' }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          maxWidth: 500,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          border: 'none',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.15)',
          },
        }}
      >
        <IconButton type="submit" sx={{ p: '10px', color: 'text.secondary' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ 
            ml: 1, 
            flex: 1,
            color: 'white',
            '& input::placeholder': {
              color: 'text.secondary',
              opacity: 1,
            },
          }}
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>
    </Box>
  );
};

export default SearchBar;
