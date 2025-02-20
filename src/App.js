import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Player from './components/Player';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Library from './pages/Library';
import Explore from './pages/Explore';
import NewMusic from './pages/NewMusic';
import Categories from './pages/Categories';
import Top100 from './pages/Top100';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3',
    },
    background: {
      default: '#170F23',
      paper: '#231B2E',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              <Sidebar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  ml: '240px', // Width of sidebar
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Navbar />
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/new-music" element={<NewMusic />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/top-100" element={<Top100 />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
            <Player />
          </Box>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
