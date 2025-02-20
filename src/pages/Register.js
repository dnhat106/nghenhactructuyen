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
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    const result = await register(formData.name, formData.email, formData.password);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error || 'Đăng ký thất bại');
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
            Đăng ký
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            Tạo tài khoản để trải nghiệm Music App
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
            label="Họ và tên"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            disabled={isLoading}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
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
                    onClick={() => setShowPassword(!showPassword)}
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
          <TextField
            fullWidth
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            disabled={isLoading}
            variant="filled"
            error={formData.confirmPassword !== '' && formData.password !== formData.confirmPassword}
            helperText={
              formData.confirmPassword !== '' && 
              formData.password !== formData.confirmPassword && 
              'Mật khẩu xác nhận không khớp'
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
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

          <Grid container justifyContent="center">
            <Grid item>
              <Link
                href="/login"
                variant="body2"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
