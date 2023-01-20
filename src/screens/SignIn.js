import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import theme from "../theme";
import stores from "../store";

const SignIn = () => {
  const { spacing } = theme;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    setEmailError(email ? '' : 'Email is required');
    setPasswordError(password ? '' : 'Password is required');
    if (email && password) {
      setLoginError('');
      try {
        await stores.authStore.login(email, password);
        navigate('/');
      } catch (err) {
        setLoginError(`${err.status}: ${err.data.detail}`);
      }
    }
  };

  return (
    <section style={{
      minHeight: '79vh',
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: spacing(4),
      gap: spacing(3)
    }}>
      <Paper elevation={0} style={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        gap: spacing(3),
        marginBottom: spacing(5),
      }}>
        <img alt="sign in profile icon" src={require("../assets/img/signin-profile.png")} />
        <Typography variant="h4">
          Login
        </Typography>
      </Paper>

      <Paper elevation={0} style={{
        width: spacing(70),
        display: 'flex',
        flexDirection: "column",
        gap: spacing(3)
      }}>
        <div style={{ height: spacing(2) }}>
          {!!loginError && (
            <Typography variant="subtitle1" color="error" textAlign="center">{loginError}</Typography>
          )}
        </div>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.currentTarget.value)}
          variant="filled"
          fullWidth
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Password"
          type={"password"}
          value={password}
          onChange={(evt) => setPassword(evt.currentTarget.value)}
          variant="filled"
          fullWidth
          error={!!passwordError}
          helperText={passwordError}
        />
      </Paper>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleLogin}
      >
        Login
      </Button>

      <Link href="#" variant="h5" underline="hover">
        Forgot your password?
      </Link>
    </section>
  );
};

export default SignIn;