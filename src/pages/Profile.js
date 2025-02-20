import React, { useState } from 'react';
import { 
  Box, Typography, Avatar, Paper, Grid, Button, 
  Divider, List, ListItem, ListItemText, ListItemAvatar,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [error, setError] = useState('');

  const handleEditOpen = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setError('');
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await updateProfile(editData);
    if (result.success) {
      handleEditClose();
    } else {
      setError(result.error || 'Cập nhật thông tin thất bại');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={user?.avatar}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              {user?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditOpen}
              disabled={isLoading}
            >
              Chỉnh sửa thông tin
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Playlist Yêu Thích
      </Typography>
      <Paper>
        <List>
          {user?.favoritePlaylist?.length > 0 ? (
            user.favoritePlaylist.map((song) => (
              <React.Fragment key={song.id}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <MusicNoteIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={song.title}
                    secondary={song.artist}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary="Chưa có bài hát yêu thích"
                secondary="Hãy thêm bài hát vào playlist yêu thích của bạn"
              />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Dialog chỉnh sửa thông tin */}
      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Họ và tên"
              name="name"
              value={editData.name}
              onChange={handleChange}
              margin="normal"
              required
              disabled={isLoading}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={editData.email}
              onChange={handleChange}
              margin="normal"
              required
              disabled={isLoading}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} disabled={isLoading}>
              Hủy
            </Button>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Profile;
