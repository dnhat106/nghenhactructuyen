import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';

const SongList = ({ title, songs, onPlay, onAddToFavorite }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Chip
          label="LÀM MỚI"
          color="secondary"
          size="small"
          sx={{
            borderRadius: 1,
            backgroundColor: '#9c27b0',
            '& .MuiChip-label': {
              fontWeight: 'bold',
            },
          }}
        />
      </Box>
      <List sx={{ 
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        {songs.map((song) => (
          <ListItem
            key={song.id}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
              '& .play-button': {
                opacity: 0,
              },
              '&:hover .play-button': {
                opacity: 1,
              },
            }}
            secondaryAction={
              <IconButton 
                edge="end" 
                aria-label="favorite"
                onClick={() => onAddToFavorite(song)}
                sx={{ color: song.isFavorite ? 'primary.main' : 'inherit' }}
              >
                <FavoriteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar sx={{ position: 'relative' }}>
              <Avatar
                variant="rounded"
                src={song.thumbnail}
                alt={song.title}
                sx={{ width: 48, height: 48 }}
              />
              <IconButton
                className="play-button"
                size="small"
                onClick={() => onPlay(song)}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  transition: 'opacity 0.2s',
                }}
              >
                <PlayArrowIcon fontSize="small" />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={song.title}
              secondary={song.artist}
              sx={{
                '& .MuiListItemText-primary': {
                  color: 'text.primary',
                },
                '& .MuiListItemText-secondary': {
                  color: 'text.secondary',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SongList;
