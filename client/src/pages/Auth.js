import React, { useState } from 'react';
import {
  Container,
  Paper,
  // AppBar, // No longer using AppBar, replacing with Box
  Tabs,
  Tab,
  Box, // Using Box instead of AppBar
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/system';

// --- Theme Customization (Blue and Purple Palette) ---
const theme = createTheme({
  palette: {
    primary: {
      main: '#673AB7', // Deep Purple - a rich, inviting primary color
    },
    secondary: {
      main: '#03A9F4', // Light Blue - a vibrant, contrasting secondary color
    },
    background: {
      default: '#E3F2FD', // Very light blue for subtle warmth
      paper: '#FFFFFF', // Keep paper white for form clarity
    },
    text: {
      primary: '#212121', // Dark grey for good contrast
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    button: { // Make button text bolder and slightly larger
      fontWeight: 600,
      fontSize: '0.9rem',
    },
  },
  shape: {
    borderRadius: 8, // Adjust default border radius for overall consistency
  }
});

// --- Styled Components ---

// Background wrapper for the entire page to apply the gradient and centering
const BackgroundWrapper = styled('div')(({ theme }) => ({
  background: 'linear-gradient(135deg, #3F51B5 10%, #7E57C2 100%)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

// Paper component for the authentication form, slightly adjusted
const AuthPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  maxWidth: 450,
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
}));

const AuthForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.shape.borderRadius * 1.5,
  fontSize: '1rem',
}));

// --- Login Form Component ---
const LoginForm = () => {
  return (
    <AuthForm noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email-login"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password-login"
        autoComplete="current-password"
      />
      <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Sign In
      </SubmitButton>
    </AuthForm>
  );
};

// --- Sign Up Form Component ---
const SignUpForm = () => {
  return (
    <AuthForm noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name-signup"
        label="Full Name"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email-signup"
        label="Email Address"
        name="email"
        autoComplete="email"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password-signup"
        autoComplete="new-password"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword-signup"
        autoComplete="new-password"
      />
      <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
      >
        Sign Up
      </SubmitButton>
    </AuthForm>
  );
};

// --- Main Authentication Page Component ---
function AuthPage() {
  const [value, setValue] = useState(0); // 0 for Login, 1 for Sign Up

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <BackgroundWrapper>
        <Container component="main" maxWidth="sm">
          <AuthPaper elevation={6}>
            <Typography component="h1" variant="h5" sx={{ mb: 1, color: 'text.primary' }}>
              {value === 0 ? 'Welcome Back!' : 'Create an Account'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {value === 0 ? 'Log in to access your dashboard.' : 'Join us and start your journey!'}
            </Typography>
            {/* Replaced AppBar with Box for more styling control */}
            <Box
              sx={{
                width: '100%',
                mt: 2,
                backgroundColor: theme.palette.primary.main, // Deep Purple background for the tabs container
                borderRadius: theme.shape.borderRadius * 1.5, // Slightly more rounded corners for the tabs container
                overflow: 'hidden', // Ensures inner elements respect border radius
                display: 'flex', // Use flexbox for direct child alignment
                justifyContent: 'space-around', // Distribute space between tabs
                alignItems: 'center', // Vertically center tabs
                height: 56, // Fixed height for the tab container, common for app bars
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary" // Blue indicator
                textColor="inherit"
                variant="fullWidth" // Ensures tabs take equal width
                aria-label="auth tabs"
                // Customizing the indicator's appearance
                TabIndicatorProps={{
                  sx: {
                    height: 4,
                    borderRadius: 2,
                    bgcolor: theme.palette.secondary.main, // Light Blue color
                    // The following will make the indicator slightly smaller than the tab itself,
                    // which can often look more refined than stretching it edge-to-edge.
                    // If you want it to be full width, you might need to adjust marginX or remove it.
                    // Or set sx={{ left: '0 !important', right: '0 !important' }} on the indicator if needed.
                  },
                }}
                sx={{
                  '& .MuiTabs-flexContainer': {
                    height: '100%', // Ensure flex container takes full height of parent Box
                  },
                }}
              >
                <Tab
                  label="LOGIN" // Capitalized as in the image
                  sx={{
                    color: 'white',
                    fontWeight: 'bold', // Match image's bold text
                    flexGrow: 1, // Allow tab to grow
                    maxWidth: 'unset', // Allow maxWidth to be controlled by flexGrow/fullWidth
                    // Styling for the selected tab to give it a lighter background, mimicking the image
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)', // Light transparent overlay for selected tab
                      borderRadius: theme.shape.borderRadius * 1, // Apply border radius to the selected tab itself
                      color: 'white', // Ensure text color remains white when selected
                    },
                  }}
                />
                <Tab
                  label="SIGN UP" // Capitalized as in the image
                  sx={{
                    color: 'white',
                    fontWeight: 'bold', // Match image's bold text
                    flexGrow: 1, // Allow tab to grow
                    maxWidth: 'unset', // Allow maxWidth to be controlled by flexGrow/fullWidth
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: theme.shape.borderRadius * 1,
                      color: 'white',
                    },
                  }}
                />
              </Tabs>
            </Box>
            <Box sx={{ width: '100%', p: 3, pt: 4 }}>
              {value === 0 && <LoginForm />}
              {value === 1 && <SignUpForm />}
            </Box>
          </AuthPaper>
        </Container>
      </BackgroundWrapper>
    </ThemeProvider>
  );
}

export default AuthPage;
