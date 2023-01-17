import React, { useState } from "react";
import dayjs from 'dayjs';
import {
  Paper,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import theme from "../theme";

const clinics = [
  {
    id: 'GeneralSurgeon',
    title: 'General Surgeon',
  },
  {
    id: 'EarNose',
    title: 'Ear and Nose',
  },
  {
    id: 'Dentist',
    title: 'Dentist',
  },
  {
    id: 'ObstetricianGynecologist',
    title: 'Obstetrician and Gynecologist',
  },
  {
    id: 'Ophthalmologist',
    title: 'Ophthalmologist',
  },
  {
    id: 'Internist',
    title: 'Internist',
  },
];

const getMinAgeDate = () => {
  const today = new Date();
  let twentyYearsAgo = new Date();
  twentyYearsAgo.setFullYear(today.getFullYear() - 20);
  return twentyYearsAgo;
}

const SignUp = () => {
  const {
    spacing,
    palette: { background }
  } = theme;

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [clinic, setClinic] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <section style={{ minHeight: '77vh', padding: spacing(3), display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" style={{ marginBottom: spacing(2) }}>Registration</Typography>
      <Typography variant="h6" style={{ marginBottom: spacing(2) }}>Personal Details</Typography>
      <Paper elevation={0} style={{
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing(3),
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing(2)
        }}>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>First Name</FormLabel>
            <TextField
              value={firstName}
              onChange={(evt) => setFirstName(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Enter Your Name' }}
            />
          </FormControl>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Middle Name</FormLabel>
            <TextField
              value={middleName}
              onChange={(evt) => setMiddleName(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Enter Your Name' }}
            />
          </FormControl>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Last Name</FormLabel>
            <TextField
              value={lastName}
              onChange={(evt) => setLastName(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Enter Your Name' }}
            />
          </FormControl>
        </div>
        {/* ************************* */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing(2)
        }}>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Clinic</FormLabel>
            <Select
              value={clinic}
              displayEmpty
              defaultValue='none'
              onChange={(evt) => setClinic(evt.target.value)}
            >
              <MenuItem value='none' disabled>Select Clinic</MenuItem>
              {clinics.map((cl) => (
                <MenuItem key={cl.id} value={cl.id}>{cl.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Mobile Number</FormLabel>
            <TextField
              value={phone}
              onChange={(evt) => setPhone(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Enter Your Mobile Number' }}
            />
          </FormControl>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Date of Birth</FormLabel>
            <DatePicker
              value={dateOfBirth}
              onChange={(evt) => setDateOfBirth(evt)}
              inputFormat="DD/MM/YYYY"
              disableFuture
              maxDate={dayjs(getMinAgeDate())}
              openTo="year"
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  inputProps={{ ...params.inputProps, placeholder: 'DD/MM/YYYY' }}
                />
              )}
            />
          </FormControl>
        </div>
        {/* ************************* */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing(2)
        }}>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Email</FormLabel>
            <TextField
              value={email}
              type="email"
              onChange={(evt) => setEmail(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Enter Your Email' }}
            />
          </FormControl>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Password</FormLabel>
            <TextField
              value={password}
              type="password"
              onChange={(evt) => setPassword(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Enter Password' }}
            />
          </FormControl>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Confirm Password</FormLabel>
            <TextField
              value={confirmPassword}
              type="password"
              onChange={(evt) => setConfirmPassword(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Confirm Password' }}
            />
          </FormControl>
        </div>
      </Paper>

      <Button
        variant="contained"
        size="large"
        onClick={() => console.log('register clicked')}
        endIcon={<SendIcon />}
        style={{
          width: spacing(15),
          background: background.default,
          marginTop: spacing(3),
          alignSelf: "flex-end"
        }}
      >Done</Button>
    </section>
  );
};

export default SignUp;