import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams, useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import {
  Paper,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  FormHelperText,
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import theme from "../theme";
import stores from "../stores";
import Spinner from "../components/Spinner";

const renderAppointmentText = (startTime, endTime) => {
  const text = `${dayjs(startTime).format("ddd DD/MM, h:mm a")} to ${dayjs(endTime).format("h:mm a")}`;
  return text;
}

const AppointmentBooking = () => {
  const {
    spacing,
    palette: { background }
  } = theme;

  const [loadingData, setLoadingData] = useState(true);
  const [doctorData, setDoctorData] = useState();
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [attemptingBook, setAttemptingBook] = useState(false);
  const [appointmentError, setAppointmentError] = useState('');
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctor");

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      stores.doctorsStore.getDoctorDataById(doctorId),
      stores.scheduleStore.getAvailableAppointmentsByDrId(doctorId),
      stores.authStore.getCurrentUser(),
    ]).then(r => {
      setDoctorData(r[0]);
      setAvailableAppointments(r[1]);
      setLoadingData(false);
    });
  }, [doctorId]);

  if (loadingData || !doctorData) {
    return <Spinner size="large" />
  }

  const { patient } = stores.authStore.user;
  const patientName = `${patient.first_name} ${patient.last_name}`;


  const handleBook = async () => {
    setAppointmentError(selectedAppointment ? '' : 'Select an appointment');
    if (patientName && selectedAppointment) {
      setAttemptingBook(true);
      try {
        const res = await stores.scheduleStore.reserveAppointment(selectedAppointment);
        if (res) {
          setSuccessfulSubmission(true);
          setTimeout(() => navigate('/doctors'), 2000);
        }
      } catch (err) {
        console.error("Error >>", err)
      } finally {
        setAttemptingBook(false);
      }
    }
  };

  return (
    <main style={{ display: 'flex' }}>
      {/* Doctor info sidebar */}
      <Paper
        style={{
          background: background.default,
          width: spacing(45),
          height: "100%",
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          gap: spacing(2),
          padding: spacing(2),
        }}
      >
        <img
          alt="Doctor profile"
          src={require("../assets/img/doctor.png")}
          width={spacing(28)}
          height={spacing(28)}
        />
        <Typography variant="h5">
          Dr. {doctorData.first_name} {doctorData.last_name}
        </Typography>
        <Typography variant="h6">
          {doctorData.speciality.name}
        </Typography>

        <p style={{ display: "flex", padding: spacing(0.5), border: "gold solid 0.9px" }}>
          {Array(4).fill(0).map((s, i) => <StarIcon key={i} color="golden" fontSize="small" />)}
          {Array(1).fill(0).map((s, i) => <StarIcon key={i} color="grey" fontSize="small" />)}
        </p>

        <p style={{
          background: "grey",
          padding: spacing(2),
          border: "grey solid",
          borderRadius: spacing(3),
          color: "white",
          fontSize: spacing(2.5),
        }}>
          <span>Graduated from Assiut University</span>
          <br />
          <span>Class: 2014</span>
          <br />
          <span>Experience: 8 years</span>
        </p>
      </Paper>

      {/* Select Appointment */}
      <div style={{
        width: "100%",
        padding: spacing(5),
        display: "flex",
        flexDirection: "column",
        gap: spacing(3),
      }}>
        <Typography variant="h5">Book Appointment</Typography>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl style={{ width: spacing(50), display: "flex", flexDirection: "column" }}>
            <FormLabel style={{ marginBottom: spacing(2) }}>Patient Name</FormLabel>
            <TextField
              value={patientName}
              onChange={(evt) => evt.preventDefault()}
              variant="outlined"
              disabled
            />
            <img
              alt='doctor writing prescription'
              src={require('../assets/img/booking-hero.png')}
              width={spacing(32)} height={spacing(48)}
              style={{ alignSelf: "center" }}
            />
          </FormControl>

          <FormControl style={{ width: spacing(50) }}>
            <FormLabel style={{ marginBottom: spacing(2) }}>
              Available Appointments (Next Week)
            </FormLabel>
            {availableAppointments.length > 0 ? (<RadioGroup
              row
              defaultValue="male"
              name="radio-buttons-group"
              value={selectedAppointment}
              onChange={(evt) => setSelectedAppointment(evt.currentTarget.value)}
              style={{
                border: "grey solid 0.5px",
                borderRadius: spacing(0.5),
                padding: spacing(2),
                display: "flex",
                flexDirection: "column",
                gap: spacing(1),
                marginBottom: spacing(1),
              }}
            >
              {availableAppointments.map(app => (
                <FormControlLabel
                  key={app.id}
                  value={app.id}
                  control={<Radio />}
                  label={renderAppointmentText(app.start_time, app.end_time)}
                />
              ))}
            </RadioGroup>) : (
              <Typography style={{
                border: "grey solid 0.5px",
                borderRadius: spacing(0.5),
                padding: spacing(2),
                marginBottom: spacing(1),
              }}>
                Doctor has no available appointments
              </Typography>
            )}
            <FormHelperText error >{appointmentError}</FormHelperText>
          </FormControl>
        </div>

        {availableAppointments.length > 0 && (
          <Button
            variant="contained"
            color={successfulSubmission ? "success" : "secondary"}
            size="large"
            onClick={handleBook}
            style={{ width: spacing(18), alignSelf: "flex-end" }}
            disabled={attemptingBook || successfulSubmission}
          >
            {attemptingBook ? "Booking ..." : "Book"}
          </Button>
        )}
      </div>
    </main >

  );
};

export default observer(AppointmentBooking);
