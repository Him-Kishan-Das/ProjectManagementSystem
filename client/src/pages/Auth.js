import React, { useState } from "react";
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import axiosInstance from "../api/axiosInstance";

const theme = createTheme({
  palette: {
    primary: {
      main: "#673AB7",
    },
    secondary: {
      main: "#03A9F4",
    },
    background: {
      default: "#E3F2FD",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    button: {
      fontWeight: 600,
      fontSize: "0.9rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const BackgroundWrapper = styled("div")(({ theme }) => ({
  background: "linear-gradient(135deg, #3F51B5 10%, #7E57C2 100%)",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  maxWidth: 450,
  width: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
}));

const AuthForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.shape.borderRadius * 1.5,
  fontSize: "1rem",
}));

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
      <SubmitButton type="submit" fullWidth variant="contained" color="primary">
        Sign In
      </SubmitButton>
    </AuthForm>
  );
};

const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleUserSignup = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setFormMessage("");
    setMessageType("");

    if (userPassword !== userConfirmPassword) {
      setPasswordError("Passwords do not match!");
      setFormMessage("Please ensure both passwords match.");
      setMessageType("error");
      return;
    } else {
      setPasswordError("");
      setFormMessage("");
      setMessageType("");
    }

    try {
      const response = await axiosInstance.post("/create-user", {
        email: userEmail,
        name: userName,
        password: userPassword,
      });

      setFormMessage(response.data.message || "Signup successful!");
      setMessageType("success");
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setUserConfirmPassword("");
    } catch (error) {
      console.error("Signup Error: ", error);
      let errorMessage = "An unexpexted error occurred. Please try again.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = `Network or client error: ${error.message}`;
      }
      setFormMessage(errorMessage);
      setMessageType("error");
    }
  };

  return (
    <AuthForm noValidate onSubmit={handleUserSignup}>
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
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
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
        onChange={(e) => setUserEmail(e.target.value)}
        value={userEmail}
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
        onChange={(e) => setUserPassword(e.target.value)}
        value={userPassword}
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
        onChange={(e) => setUserConfirmPassword(e.target.value)}
        value={userConfirmPassword}
      />

      {formMessage && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            borderRadius: "4px",
            textAlign: "center",
            color: messageType === "error" ? "white" : "green",
            backgroundColor: messageType === "error" ? "#f44336" : "#e8f5e9", 
            border:
              messageType === "error"
                ? "1px solid #d32f2f"
                : "1px solid #a5d6a7",
          }}
        >
          {formMessage}
        </div>
      )}

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

function AuthPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <BackgroundWrapper>
        <Container component="main" maxWidth="sm">
          <AuthPaper elevation={6}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ mb: 1, color: "text.primary" }}
            >
              {value === 0 ? "Welcome Back!" : "Create an Account"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {value === 0
                ? "Log in to access your dashboard."
                : "Join us and start your journey!"}
            </Typography>

            <Box
              sx={{
                width: "100%",
                mt: 2,
                backgroundColor: theme.palette.primary.main,
                borderRadius: theme.shape.borderRadius * 1.5,
                overflow: "hidden",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                height: 56,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="auth tabs"
                TabIndicatorProps={{
                  sx: {
                    height: 4,
                    borderRadius: 2,
                    bgcolor: theme.palette.secondary.main,
                  },
                }}
                sx={{
                  "& .MuiTabs-flexContainer": {
                    height: "100%",
                  },
                }}
              >
                <Tab
                  label="LOGIN"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    flexGrow: 1,
                    maxWidth: "unset",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: theme.shape.borderRadius * 1,
                      color: "white",
                    },
                  }}
                />
                <Tab
                  label="SIGN UP"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    flexGrow: 1,
                    maxWidth: "unset",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: theme.shape.borderRadius * 1,
                      color: "white",
                    },
                  }}
                />
              </Tabs>
            </Box>
            <Box sx={{ width: "100%", p: 3, pt: 4 }}>
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
