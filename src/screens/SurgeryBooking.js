import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Paper,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import theme from "../theme";
import stores from "../stores";
import { useNavigate } from "react-router-dom";
import { surgeryRooms, surgeryTypes } from "../constants";
import { SubmitSuccess } from "../components/SubmitSuccess";
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getDateDaysAhead } from "../utils/dateUtils";

const SurgeryBooking = () => {
  useEffect(() => {
    stores.patientsStore.getPatientsList();
    stores.doctorsStore.getDoctorsList();
  }, []);

  const { spacing } = theme;
  const navigate = useNavigate();


  const [doctors, setDoctors] = useState([]);
  const [doctorsError, setDoctorsError] = useState("");

  const [patient, setPatient] = useState("");
  const [patientError, setPatientError] = useState("");

  const [room, setRoom] = useState("");
  const [roomError, setRoomError] = useState("");

  const [surgeryType, setSurgeryType] = useState("");
  const [surgeryTypeError, setSurgeryTypeError] = useState("");

  const [startTime, setStartTime] = useState(null);
  const [startTimeError, setStartTimeError] = useState("");

  const [estimatedTime, setEstimatedTime] = useState("");
  const [estimatedTimeError, setEstimatedTimeError] = useState("");


  const [attemptingSubmit, setAttemptingSubmit] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const handleSubmit = async () => {
    setAttemptingSubmit(true);
    setDoctorsError(doctors.length > 0 ? '' : 'Doctors Ids are required');
    setPatientError(patient ? '' : 'Patient Id is required');
    setRoomError(room ? '' : 'Room Id is required');
    setSurgeryTypeError(surgeryType ? '' : 'Surgery type Id is required');
    setStartTimeError(startTime ? '' : 'Start time is required');
    setEstimatedTimeError(estimatedTime ? '' : 'Estimated time is required');


    if (patient && room && surgeryType && doctors.length > 0 && startTime && estimatedTime) {
      const newService = {
        patient,
        room,
        surgery_type: surgeryType,
        doctors,
        start_time: startTime,
        estimated_time: estimatedTime,
      };

      const res = await stores.doctorServicesStore.createNewDoctorService(
        newService, "surgery",
      );

      if (res) {
        setSuccessfulSubmission(true);
        setTimeout(
          () => navigate("/doctor/services"),
          2000,
        )
      }
    }
    setAttemptingSubmit(false);
  };

  return (
    <section style={{
      display: "flex",
      justifyContent: "space-between",
      padding: spacing(3),
    }}>
      <div style={{ margin: spacing(3) }}>
        <Paper elevation={0} style={{
          width: spacing(60),
          display: 'flex',
          flexDirection: "column",
          gap: spacing(3),
          marginLeft: spacing(15),
        }}>

          <Typography variant="h4">Surgical Operation</Typography>
          {successfulSubmission ? (<SubmitSuccess />) : (
            <>
              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(16) }}>
                  Patient:
                </FormLabel>
                <Select
                  value={patient}
                  displayEmpty
                  defaultValue='none'
                  onChange={(evt) => setPatient(evt.target.value)}
                  error={!!patientError}
                  style={{ width: spacing(45) }}
                >
                  <MenuItem value='none' disabled>Patient</MenuItem>
                  {stores.patientsStore.patientsList.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>{patient.first_name} {patient.last_name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {patientError}
                </FormHelperText>
              </FormControl>

              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(16) }}>
                  Room:
                </FormLabel>
                <Select
                  value={room}
                  displayEmpty
                  defaultValue='none'
                  onChange={(evt) => setRoom(evt.target.value)}
                  error={!!roomError}
                  style={{ width: spacing(45) }}
                >
                  <MenuItem value='none' disabled>Room</MenuItem>
                  {Object.entries(surgeryRooms).map(([id, name]) => (
                    <MenuItem key={id} value={id}>{name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {roomError}
                </FormHelperText>
              </FormControl>

              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(16) }}>
                  Surgery Type:
                </FormLabel>
                <Select
                  value={surgeryType}
                  displayEmpty
                  defaultValue='none'
                  onChange={(evt) => setSurgeryType(evt.target.value)}
                  error={!!surgeryTypeError}
                  style={{ width: spacing(45) }}
                >
                  <MenuItem value='none' disabled>Surgery</MenuItem>
                  {Object.entries(surgeryTypes).map(([id, name]) => (
                    <MenuItem key={id} value={id}>{name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {surgeryTypeError}
                </FormHelperText>
              </FormControl>

              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(24) }}>
                  Performing Doctors:
                </FormLabel>
                <Select
                  value={doctors}
                  multiple
                  displayEmpty
                  defaultValue='none'
                  onChange={(evt) => setDoctors(evt.target.value)}
                  error={!!doctorsError}
                  style={{ width: spacing(45) }}
                >
                  <MenuItem value='none' disabled>Doctor</MenuItem>
                  {stores.doctorsStore.doctorsList.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>{doctor.first_name} {doctor.last_name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {doctorsError}
                </FormHelperText>
              </FormControl>


              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(16) }}>
                  Start time:
                </FormLabel>
                <DateTimePicker
                  value={startTime}
                  onChange={(evt) => setStartTime(dayjs(evt).format("YYYY-MM-DDTHH:mm:ssZ"))}
                  inputFormat="hh:mm a - DD/MM/YYYY"
                  disablePast
                  maxDate={dayjs(getDateDaysAhead(10))}
                  openTo="day"
                  renderInput={params => (
                    <TextField
                      {...params}
                      style={{ width: spacing(45) }}
                      variant="outlined"
                      inputProps={{ ...params.inputProps, placeholder: 'DD/MM/YYYY' }}
                      error={!!startTimeError}
                    />
                  )}
                />
                <FormHelperText error>{startTimeError}</FormHelperText>
              </FormControl>

              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(32) }}>
                  Estimated time (in minutes):
                </FormLabel>
                <TextField
                  value={estimatedTime}
                  type="number"
                  onChange={(evt) => setEstimatedTime(evt.currentTarget.value)}
                  variant="outlined"
                  error={!!estimatedTimeError}
                  style={{ width: spacing(45) }}
                />
                <FormHelperText error>
                  {estimatedTimeError}
                </FormHelperText>
              </FormControl>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSubmit}
                disabled={attemptingSubmit}
                style={{
                  width: spacing(20),
                  borderRadius: spacing(2),
                  alignSelf: "flex-end",
                }}
              >
                {attemptingSubmit ? "Submitting ..." : "Submit"}
              </Button>
            </>
          )}
        </Paper>
      </div>

      <img
        alt='doctor writing prescription'
        src={require('../assets/img/doctor-services/surgery-hero.png')}
        width={spacing(70)} height={spacing(55)}
      />

    </section >
  );
};

export default observer(SurgeryBooking);
