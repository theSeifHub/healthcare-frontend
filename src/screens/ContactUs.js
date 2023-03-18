import React, { useState } from "react";
import {
  Paper,
  TextField,
  FormControl,
  FormLabel,
  Button,
  Typography,
} from "@mui/material";
import theme from "../theme";

const ContactUs = () => {
  const {
    spacing,
    palette: {
      background
    }
  } = theme;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [emailError, setEmailError] = useState('');
  const [commentError, setCommentError] = useState('');

  const handleSend = () => {
    setEmailError(email ? '' : 'Your email is required');
    setCommentError(comment ? '' : 'Your comment is required');
    if (email && comment) {
      setName('');
      setEmail('');
      setPhone('');
      setComment('');
      alert(`your message is sent successfully`);
    }
  };

  return (
    <section style={{ marginTop: spacing(2), display: "flex", justifyContent: "center" }}>
      <div style={{ width: spacing(100), margin: spacing(3) }}>
        <Paper elevation={0} style={{
          width: '100%',
          background: background.default,
          display: 'flex',
          flexDirection: "column",
          gap: spacing(3),
          padding: spacing(3),
        }}>
          <Typography variant="h4" style={{ textDecoration: "underline" }}>
            Contact Us
          </Typography>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Name:</FormLabel>
            <TextField
              value={name}
              onChange={(evt) => setName(evt.currentTarget.value)}
              variant="outlined"
              style={{ background: background.paper, flex: 2 }}
            />
          </FormControl>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Email:</FormLabel>
            <TextField
              value={email}
              onChange={(evt) => setEmail(evt.currentTarget.value)}
              variant="outlined"
              style={{ background: background.paper, flex: 2 }}
              error={!!emailError}
              helperText={emailError}
              FormHelperTextProps={{
                style: {
                  background: background.default,
                  width: "100%",
                  margin: 0,
                  paddingLeft: spacing(1),
                }
              }}
            />
          </FormControl>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Phone:</FormLabel>
            <TextField
              value={phone}
              onChange={(evt) => setPhone(evt.currentTarget.value)}
              variant="outlined"
              style={{ background: background.paper, flex: 2 }}
            />
          </FormControl>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Comment:</FormLabel>
            <TextField
              value={comment}
              onChange={(evt) => setComment(evt.currentTarget.value)}
              variant="outlined"
              style={{ background: background.paper, flex: 2 }}
              multiline
              rows={5}
              error={!!commentError}
              helperText={commentError}
              FormHelperTextProps={{
                style: {
                  background: background.default,
                  width: "100%",
                  margin: 0,
                  paddingLeft: spacing(1),
                }
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSend}
            style={{ width: spacing(15), borderRadius: spacing(5), alignSelf: "center" }}
          >
            Send
          </Button>
        </Paper>
      </div>
    </section>
  );
};

export default ContactUs;