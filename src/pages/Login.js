import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, loginWithGoogle, loginWithZalo } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Đăng nhập thất bại');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Đăng nhập bằng Google thất bại');
    }
  };

  const handleZaloLogin = async () => {
    try {
      await loginWithZalo();
      navigate('/');
    } catch (error) {
      setError('Đăng nhập bằng Zalo thất bại');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #1DB954 30%, #191414 90%)',
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 450,
          width: '100%',
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <MusicNoteIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            Đăng nhập
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            Chào mừng bạn trở lại với Music App
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            disabled={isLoading}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiFilledInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.09)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.13)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(0, 0, 0, 0.09)',
                }
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.7)',
                '&.Mui-focused': {
                  color: 'primary.main',
                  fontWeight: 500
                }
              },
              '& .MuiFilledInput-input': {
                color: 'rgba(0, 0, 0, 0.9)',
                fontWeight: 500
              }
            }}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            disabled={isLoading}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiFilledInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.09)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.13)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(0, 0, 0, 0.09)',
                }
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.7)',
                '&.Mui-focused': {
                  color: 'primary.main',
                  fontWeight: 500
                }
              },
              '& .MuiFilledInput-input': {
                color: 'rgba(0, 0, 0, 0.9)',
                fontWeight: 500
              }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: 2,
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0 4px 6px rgba(29, 185, 84, 0.25)',
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>

          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs>
              <Divider />
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                hoặc
              </Typography>
            </Grid>
            <Grid item xs>
              <Divider />
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{ mb: 2 }}
          >
            Đăng nhập bằng Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleZaloLogin}
            sx={{
              color: '#0068FF',
              borderColor: '#0068FF',
              '&:hover': {
                borderColor: '#0068FF',
                backgroundColor: 'rgba(0, 104, 255, 0.04)',
              },
            }}
          >
            Đăng nhập bằng Zalo
          </Button>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/register"
                variant="body2"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Chưa có tài khoản? Đăng ký
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
