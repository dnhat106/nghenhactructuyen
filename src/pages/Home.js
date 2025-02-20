import React, { useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Box, Container, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SongList from '../components/SongList';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user, addToFavorites, removeFromFavorites } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Nếu có hash #categories trong URL, scroll đến phần thể loại
    if (location.hash === '#categories') {
      const element = document.getElementById('categories');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Mock data for recommended songs
  const recommendedSongs = [
    {
      id: 1,
      title: 'Bỉ Ngạn / 彼岸',
      artist: 'Tình Lãng / 情郎, Tình Bích / 汀碧',
      thumbnail: 'https://i.ytimg.com/vi/eZOLOlZQ5KQ/maxresdefault.jpg',
      isFavorite: false
    },
    {
      id: 2,
      title: 'TRĂM BỘ NHỚ (feat...)',
      artist: 'ANH TRẠI "SAY HI", Dương Domic',
      thumbnail: 'https://i.ytimg.com/vi/YBJ_-tlWB0Y/maxresdefault.jpg',
      isFavorite: false
    },
    {
      id: 3,
      title: 'Em Ơi Lên Phố',
      artist: 'Minh Vương M4U',
      thumbnail: 'https://i.ytimg.com/vi/LbiQ7b3Nz8k/maxresdefault.jpg',
      isFavorite: false
    },
    {
      id: 4,
      title: 'Anh Nhà Ở Đâu Thế?',
      artist: 'AMEE, B Ray',
      thumbnail: 'https://i.ytimg.com/vi/DuZYxsYCk-Y/maxresdefault.jpg',
      isFavorite: false
    },
    {
      id: 5,
      title: 'Hơn Cả Yêu',
      artist: 'Đức Phúc',
      thumbnail: 'https://i.ytimg.com/vi/KdrbBJNFwGw/maxresdefault.jpg',
      isFavorite: false
    }
  ];

  // Mock data for trending songs
  const trendingSongs = [
    {
      id: 6,
      title: 'Thôi Hay Quên Đi / 就忘了吧',
      artist: '1K',
      thumbnail: 'https://i.ytimg.com/vi/97JbT_GYI7E/maxresdefault.jpg',
      isFavorite: false
    },
    {
      id: 7,
      title: 'Qua Cầu Rước Em',
      artist: 'DanhKa',
      thumbnail: 'https://i.ytimg.com/vi/2G8IfyGEQlw/maxresdefault.jpg',
      isFavorite: false
    },
    {
      id: 8,
      title: 'Tango Trên Bờ Biển / 海边探戈',
      artist: 'Vương Hạc Đệ / 王鹤棣',
      thumbnail: 'https://i.ytimg.com/vi/9SOJ5n5hxNE/maxresdefault.jpg',
      isFavorite: false
    }
  ];

  const featuredPlaylists = [
    {
      id: 1,
      title: 'Top Hits 2024',
      description: 'The hottest tracks right now',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80',
    },
    {
      id: 2,
      title: 'Chill Vibes',
      description: 'Relaxing beats for your day',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80',
    },
    {
      id: 3,
      title: 'EDM Party',
      description: 'Electronic dance hits',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80',
    },
    {
      id: 4,
      title: 'Acoustic Love',
      description: 'Beautiful acoustic songs',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80',
    },
    {
      id: 5,
      title: 'Hip Hop Mix',
      description: 'Best hip hop tracks',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80',
    },
    {
      id: 6,
      title: 'Rock Classics',
      description: 'Timeless rock songs',
      image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&q=80',
    },
  ];

  const handlePlay = (song) => {
    console.log('Playing:', song.title);
    // TODO: Implement play functionality
  };

  const handleAddToFavorite = (song) => {
    if (user) {
      if (song.isFavorite) {
        removeFromFavorites(song.id);
      } else {
        addToFavorites(song);
      }
      // Update song's favorite status in the list
      song.isFavorite = !song.isFavorite;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Recommended and Trending Songs */}
        <Box sx={{ mb: 6 }}>
          <SongList
            title="Gợi Ý Cho Bạn"
            songs={recommendedSongs}
            onPlay={handlePlay}
            onAddToFavorite={handleAddToFavorite}
          />
          <SongList
            title="Thịnh Hành"
            songs={trendingSongs}
            onPlay={handlePlay}
            onAddToFavorite={handleAddToFavorite}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Featured Playlists */}
        <Box id="categories">
          <Typography variant="h5" gutterBottom sx={{ 
            mb: 3,
            fontWeight: 500 
          }}>
            Thể Loại
          </Typography>
          
          <Grid container spacing={3}>
            {featuredPlaylists.map((playlist) => (
              <Grid item xs={12} sm={6} md={4} key={playlist.id}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    cursor: 'pointer'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={playlist.image}
                    alt={playlist.title}
                    sx={{ 
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {playlist.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {playlist.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
