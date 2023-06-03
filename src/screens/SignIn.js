import React, { useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import theme from "../theme";
import stores from "../stores";

const SignIn = () => {
  const { spacing } = theme;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [attemptingLogin, setAttemptingLogin] = useState(false);

  const handleLogin = async () => {
    setEmailError(email ? '' : 'Email is required');
    setPasswordError(password ? '' : 'Password is required');
    if (email && password) {
      try {
        setAttemptingLogin(true);
        setLoginError('');
        await stores.authStore.login(email, password);
        navigate('/');
      } catch (err) {
        if (err) {
          setLoginError(`${err.status}: ${err.data.detail}`);
        } else {
          setLoginError("Unknown error occurred, try again later");
        }
      } finally {
        setAttemptingLogin(false);
      }
    }
  };

  return (
    <section style={{
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,
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
        disabled={attemptingLogin}
      >
        {attemptingLogin ? "Logging In ..." : "Login"}
      </Button>
    </section>
  );
};

export default SignIn;