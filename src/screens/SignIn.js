import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Link } from "@mui/material";
import theme from "../theme";

const SignIn = () => {
  const { spacing } = theme;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <TextField
          label="Email"
          value={email}
          onChange={(evt) => setEmail(evt.currentTarget.value)}
          variant="filled"
          fullWidth />
        <TextField
          label="Password"
          type={"password"}
          value={password}
          onChange={(evt) => setPassword(evt.currentTarget.value)}
          variant="filled"
          fullWidth />
      </Paper>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => console.log('login clicked')}
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