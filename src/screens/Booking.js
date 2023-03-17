import React, { useState } from "react";
import dayjs from 'dayjs';
import {
  Paper,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography
} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import theme from "../theme";

const getMinDate = () => {
  const today = new Date();
  let after2Days = new Date();
  after2Days.setDate(today.getDate() + 2);
  return after2Days;
}

const Booking = () => {
  const {
    spacing,
    palette: { background }
  } = theme;

  const [patientName, setPatientName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointment, setAppointment] = useState(null);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  return (
    <section style={{ marginTop: spacing(2), display: "flex" }}>
      <div style={{ flex: 3, margin: spacing(3) }}>
        <Paper elevation={0} style={{
          width: '100%',
          background: background.default,
          display: 'flex',
          flexDirection: "column",
          gap: spacing(3),
          padding: spacing(3),
        }}>
          <Typography variant="h4">Book Appointment</Typography>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Patient Name:</FormLabel>
            <TextField
              value={patientName}
              onChange={(evt) => setPatientName(evt.currentTarget.value)}
              variant="outlined"
              style={{ background: background.paper, flex: 2 }}
            />
          </FormControl>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>National ID:</FormLabel>
            <TextField
              value={nationalId}
              onChange={(evt) => setNationalId(evt.currentTarget.value)}
              variant="outlined"
              style={{ background: background.paper, flex: 2 }}
            />
          </FormControl>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Phone Number:</FormLabel>
            <TextField
              value={phone}
              onChange={(evt) => setPhone(evt.currentTarget.value)}
              variant="outlined"
              style={{ background: background.paper, flex: 2 }}
            />
          </FormControl>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Doctor Name:</FormLabel>
            <TextField
              value={doctorName}
              onChange={(evt) => setDoctorName(evt.currentTarget.value)}
              variant="outlined"
              style={{ background: background.paper, flex: 2 }}
            />
          </FormControl>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Appointment:</FormLabel>
            <DateTimePicker
              value={appointment}
              onChange={(evt) => {
                setAppointment(evt)
              }}
              inputFormat="ddd: DD/MM/YYYY hh:mm A"
              minDate={dayjs(getMinDate())}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  style={{ background: background.paper, flex: 2 }}
                  inputProps={{ ...params.inputProps, placeholder: '' }}
                />
              )}
            />
          </FormControl>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Gender:</FormLabel>
            <RadioGroup
              row
              defaultValue="male"
              name="radio-buttons-group"
              value={gender}
              onChange={(evt) => setGender(evt.currentTarget.value)}
              style={{ flex: 2 }}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          <FormControl style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <FormLabel style={{ flex: 1 }}>Age:</FormLabel>
            <TextField
              value={age}
              onChange={(evt) => setAge(evt.currentTarget.value)}
              variant="outlined"
              style={{ background: background.paper, flex: 2 }}
            />
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              const bookingData = {
                patientName, nationalId, phone, doctorName, gender, age,
                appointment: dayjs(appointment).get('date'),
              };
              console.log("🚀 ~ bookingData >>>\n", bookingData);
              alert('confirm clicked');
            }}
            style={{ width: spacing(15), borderRadius: spacing(5), alignSelf: "flex-end" }}
          >
            Confirm
          </Button>

        </Paper>
      </div>

      <div style={{ alignSelf: "flex-end", flex: 2, textAlign: 'right', padding: spacing(2) }}>
        <img
          alt='doctor writing prescription'
          src={require('../assets/img/booking-hero.png')}
          width={spacing(45)} height={spacing(60)}
        />
      </div>
    </section>
  );
};

export default Booking;
