import React from 'react';
import { Paper, Box } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = () => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Box sx={{ p: 1 }}>
        <AudioPlayer
          autoPlay={false}
          src=""
          onPlay={() => console.log("Playing")}
          showSkipControls={true}
          showJumpControls={false}
          style={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        />
      </Box>
    </Paper>
  );
};

export default Player;
