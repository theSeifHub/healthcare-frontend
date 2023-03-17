import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import {
  Paper,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import theme from "../theme";
import stores from "../store";

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

  const navigate = useNavigate();

  const [signUpError, setSignUpError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [clinic, setClinic] = useState('');
  const [clinicError, setClinicError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleRegister = async () => {
    setFirstNameError(firstName ? '' : 'First name is required');
    setLastNameError(lastName ? '' : 'Last name is required');
    setUserNameError(userName ? '' : 'Username is required');
    // setClinicError(clinic ? '' : 'Clinic is missing');
    // setPhoneError(phone ? '' : 'Phone is missing');
    // setDateOfBirthError(dateOfBirth ? '' : 'Date of birth is missing');
    setEmailError(email ? '' : 'Email is required');
    setPasswordError(password ? '' : 'Password is required');
    setConfirmPasswordError((confirmPassword && confirmPassword === password)
      ? '' : 'Passwords must match');
    if (email && password && userName && firstName && lastName && password === confirmPassword) {
      try {
        const doctorData = {
          email,
          password,
          user_name: userName,
          first_name: firstName,
          last_name: lastName,
        };
        await stores.authStore.registerDoctor(doctorData);
        navigate("/sign-in");
      } catch (err) {
        setSignUpError(`${err.status}: ${err.data[Object.keys(err.data)[0]]}`);
      }
    }
  };

  return (
    <section style={{ padding: spacing(3), display: 'flex', flexDirection: 'column' }}>
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
              error={!!firstNameError}
              helperText={firstNameError}
            />
          </FormControl>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Last Name</FormLabel>
            <TextField
              value={lastName}
              onChange={(evt) => setLastName(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Enter Your Name' }}
              error={!!lastNameError}
              helperText={lastNameError}
            />
          </FormControl>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Username</FormLabel>
            <TextField
              value={userName}
              onChange={(evt) => setUserName(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Enter A Username' }}
              error={!!userNameError}
              helperText={userNameError}
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
              error={!!clinicError}
            >
              <MenuItem value='none' disabled>Select Clinic</MenuItem>
              {clinics.map((cl) => (
                <MenuItem key={cl.id} value={cl.id}>{cl.title}</MenuItem>
              ))}
            </Select>
            <FormHelperText error>{clinicError}</FormHelperText>
          </FormControl>
          <FormControl style={{ flex: 1 }}>
            <FormLabel style={{ marginBottom: spacing(1) }}>Mobile Number</FormLabel>
            <TextField
              value={phone}
              onChange={(evt) => setPhone(evt.currentTarget.value)}
              variant="outlined"
              inputProps={{ placeholder: 'Enter Your Mobile Number' }}
              error={!!phoneError}
              helperText={phoneError}
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
                  error={!!dateOfBirthError}
                  helperText={dateOfBirthError}
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
              error={!!emailError}
              helperText={emailError}
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
              error={!!passwordError}
              helperText={passwordError}
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
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
          </FormControl>
        </div>
      </Paper>

      <div style={{ height: spacing(2), marginTop: spacing(2) }}>
        {!!signUpError && (
          <Typography variant="subtitle1" color="error" textAlign="center">{signUpError}</Typography>
        )}
      </div>

      <Button
        variant="contained"
        size="large"
        onClick={handleRegister}
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