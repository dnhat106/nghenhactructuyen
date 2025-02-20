import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Playlist = () => {
  const { id } = useParams();
  
  // TODO: Fetch playlist data based on id
  const playlist = {
    title: 'Sample Playlist',
    songs: [
      { id: 1, title: 'Song 1', artist: 'Artist 1' },
      { id: 2, title: 'Song 2', artist: 'Artist 2' },
    ]
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {playlist.title}
      </Typography>

      <List>
        {playlist.songs.map((song) => (
          <ListItem button key={song.id}>
            <ListItemIcon>
              <MusicNoteIcon />
            </ListItemIcon>
            <ListItemText 
              primary={song.title}
              secondary={song.artist}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Playlist;
