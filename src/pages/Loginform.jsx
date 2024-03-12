import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import axios from 'axios'
import Logo from '../assets/logo.png'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
     
      {new Date().getFullYear()}
      {'.'}
      All Copyright Reserved,
      <Link color="inherit" href="https://wpits.com/">
        WPITS
      </Link>{' '}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.



export default function Loginform() {
  const navigate = useNavigate();
  
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const defaultTheme = createTheme();
  const [open, setOpen] = React.useState(false);
  const showNotification = (message, type) => {
    setNotify({
      isOpen: true,
      message: message,
      type: type,
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    onSubmit: async (values) => {
      const { email, password } = values;

  try {
    // Make a POST API request to authenticate the user
    const response = await fetch('http://172.5.10.2:9090/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        // Parse the JSON response
        const responseData = await response.json();

        // Extract the JWT token from the response
        const jwtToken = responseData.jwtToken;
        const username=responseData.user;
        console.log("username  ----------->"+username.email)
        console.log('JWT Token:', jwtToken);

        // Save the authentication token or user data as needed
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('auth', 'super');
        localStorage.setItem('userName', username.email);
        localStorage.setItem('auth',"super");

        showNotification('Login successful!', 'success');
          navigate('/customer')
      } else {
        console.error('Invalid content type. Expected JSON.');
        showNotification('Invalid Credentials ! ', 'error');
      }
    } else {
      // Authentication failed
      console.error('Authentication failed:', response.statusText);
      showNotification('Login Failed ! Please check Credentials', 'error');
    }
  } catch (error) {
    
    console.error('Error during authentication:', error.message);
    showNotification('Invalid Credentials ! ', 'error');
  }

    }
  })
  const [result, setResult] = useState();




  const getApi = async (values) => {
    console.log(values.email)

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
     <Card sx={{marginTop:5,padding:2,width:500,boxShadow:10, backgroundColor:'#FEFEFE'}}>
     <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={Logo} alt='_blank' width={180} height={180}  />

        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            label="Password"
            type="password"
            id="password"
            value={values.password}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
          
            sx={{ mt: 3, mb: 2,backgroundColor:'#253A7D' }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs style={{textAlign:'center'}}>
              <Button variant="body2" onClick={handleClickOpen}>
                Forgot Password
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Forgot Password</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {/* Your forgot password content here */}
                    To reset your password, please enter your Login Id.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="forgotPasswordEmail"
                    label="Login Id"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Reset Password</Button>
                </DialogActions>
              </Dialog>
            </Grid>

          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2, mb: 4 }} />
      <Snackbar
        open={notify.isOpen}
        autoHideDuration={3000}
        onClose={() => setNotify({ ...notify, isOpen: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={notify.type} onClose={() => setNotify({ ...notify, isOpen: false })}>
          {notify.message}
        </Alert>
      </Snackbar>
     </Card>
    </Container>
  );
}