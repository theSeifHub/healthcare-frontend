import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import {
  Paper,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import theme from "../theme";
import stores from "../stores";

const getDateYearsAgo = (noOfYearsAgo) => {
  const today = new Date();
  let dateYearsAgo = new Date();
  dateYearsAgo.setFullYear(today.getFullYear() - noOfYearsAgo);
  return dateYearsAgo;
}

const PatientSignUp = () => {
  const {
    spacing,
    palette: { background }
  } = theme;

  const navigate = useNavigate();

  const [signUpError, setSignUpError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [middleNameError, setMiddleNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [nationalIdError, setNationalIdError] = useState('');

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
    setMiddleNameError(middleName ? '' : 'Middle name is required');
    setLastNameError(lastName ? '' : 'Last name is required');
    setUserNameError(userName ? '' : 'Username is required');
    setNationalIdError(nationalId ? '' : 'National ID is required');
    setPhoneError(phone ? '' : 'Phone is missing');
    setDateOfBirthError(dateOfBirth ? '' : 'Date of birth is missing');
    setEmailError(email ? '' : 'Email is required');
    setPasswordError(password ? '' : 'Password is required');
    setConfirmPasswordError((confirmPassword && confirmPassword === password)
      ? '' : 'Passwords must match');
    if (
      userName
      && email
      && password
      && password === confirmPassword
      && nationalId
      && firstName
      && middleName
      && lastName
    ) {
      try {
        const userData = {
          user_name: userName,
          email,
          password,
        };
        const userRes = await stores.authStore.registerNewUser(userData);

        await stores.authStore.login(email, password);

        const patientData = {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          phone,
          date_of_birth: dateOfBirth,
          user: userRes.id,
          national_Id: nationalId,
        };

        await stores.patientsStore.createNewPatient(patientData);
        navigate("/");
      } catch (err) {
        setSignUpError(`${err.status}: ${err.data[Object.keys(err.data)[0]]}`);
      }
    }
  };

  return (
    <section style={{ padding: `${spacing(3)} ${spacing(5)}`, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" style={{ marginBottom: spacing(2) }}>Patient Registration</Typography>

      <div style={{ height: spacing(6), marginTop: spacing(2) }}>
        {!!signUpError && (
          <Typography
            variant="h5"
            color="error"
            textAlign="center"
          >
            {signUpError}
          </Typography>
        )}
      </div>

      <Paper elevation={0} style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "space-between",
        rowGap: spacing(3),
      }}>
        <FormControl style={{ width: spacing(55) }}>
          <FormLabel style={{ marginBottom: spacing(1) }}>First Name</FormLabel>
          <TextField
            value={firstName}
            onChange={(evt) => setFirstName(evt.currentTarget.value)}
            variant="outlined"
            inputProps={{ placeholder: 'Enter First Name' }}
            error={!!firstNameError}
            helperText={firstNameError}
          />
        </FormControl>

        <FormControl style={{ width: spacing(55) }}>
          <FormLabel style={{ marginBottom: spacing(1) }}>Middle Name</FormLabel>
          <TextField
            value={middleName}
            onChange={(evt) => setMiddleName(evt.currentTarget.value)}
            variant="outlined"
            inputProps={{ placeholder: 'Enter Middle Name' }}
            error={!!middleNameError}
            helperText={middleNameError}
          />
        </FormControl>

        <FormControl style={{ width: spacing(55) }}>
          <FormLabel style={{ marginBottom: spacing(1) }}>Last Name</FormLabel>
          <TextField
            value={lastName}
            onChange={(evt) => setLastName(evt.currentTarget.value)}
            variant="outlined"
            inputProps={{ placeholder: 'Enter Last Name' }}
            error={!!lastNameError}
            helperText={lastNameError}
          />
        </FormControl>

        <FormControl style={{ width: spacing(55) }}>
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

        <FormControl style={{ width: spacing(55) }}>
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

        <FormControl style={{ width: spacing(55) }}>
          <FormLabel style={{ marginBottom: spacing(1) }}>National ID</FormLabel>
          <TextField
            value={nationalId}
            onChange={(evt) => setNationalId(evt.currentTarget.value)}
            variant="outlined"
            inputProps={{ placeholder: 'Enter Your National ID' }}
            error={!!nationalIdError}
            helperText={nationalIdError}
          />
        </FormControl>

        <FormControl style={{ width: spacing(55) }}>
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

        <FormControl style={{ width: spacing(55) }}>
          <FormLabel style={{ marginBottom: spacing(1) }}>Date of Birth</FormLabel>
          <DatePicker
            value={dateOfBirth}
            onChange={(evt) => setDateOfBirth(dayjs(evt).format("YYYY-MM-DD"))}
            inputFormat="DD/MM/YYYY"
            disableFuture
            maxDate={dayjs(getDateYearsAgo(0))}
            minDate={dayjs(getDateYearsAgo(100))}
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

        <FormControl style={{ width: spacing(55) }}>
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

        <FormControl style={{ width: spacing(55) }}>
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

        <FormControl style={{ width: spacing(55), height: spacing(11) }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleRegister}
            endIcon={<SendIcon />}
            style={{
              width: spacing(15),
              background: background.default,
              marginLeft: "auto",
              marginTop: "auto",
            }}
          >Done</Button>
        </FormControl>

      </Paper>

    </section>
  );
};

export default PatientSignUp;