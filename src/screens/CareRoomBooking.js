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
import { icuBeds } from "../constants";
import { SubmitSuccess } from "../components/SubmitSuccess";
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getDateDaysAhead } from "../utils/dateUtils";

const CareRoomBooking = () => {
  useEffect(() => {
    stores.patientsStore.getPatientsList();
  }, []);

  const { spacing } = theme;
  const navigate = useNavigate();

  const [patient, setPatient] = useState("");
  const [patientError, setPatientError] = useState("");
  const [bed, setBed] = useState("");
  const [bedError, setBedError] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [startTimeError, setStartTimeError] = useState('');
  const [estimatedTime, setEstimatedTime] = useState("");
  const [estimatedTimeError, setEstimatedTimeError] = useState('');

  const [attemptingSubmit, setAttemptingSubmit] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const handleSubmit = async () => {
    setAttemptingSubmit(true);
    setPatientError(patient ? '' : 'Patient Id is required');
    setBedError(bed ? '' : 'Bed Id is required');
    setStartTimeError(startTime ? '' : 'Start time is required');
    setEstimatedTimeError(estimatedTime ? '' : 'Estimated time is required');

    if (patient && bed && startTime && estimatedTime) {
      const newService = {
        patient,
        bed,
        start_time: startTime,
        estimated_time: estimatedTime,
      };

      const res = await stores.doctorServicesStore.createNewDoctorService(
        newService, "icu",
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

          <Typography variant="h4">Care Room</Typography>
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
                  Bed:
                </FormLabel>
                <Select
                  value={bed}
                  displayEmpty
                  defaultValue='none'
                  onChange={(evt) => setBed(evt.target.value)}
                  error={!!bedError}
                  style={{ width: spacing(45) }}
                >
                  <MenuItem value='none' disabled>Bed</MenuItem>
                  {Object.entries(icuBeds).map(([id, name]) => (
                    <MenuItem key={id} value={id}>{name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {bedError}
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
                <FormLabel style={{ width: spacing(24) }}>
                  Estimated time (in days):
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
        src={require('../assets/img/doctor-services/care-room-hero.png')}
        width={spacing(70)} height={spacing(55)}
      />

    </section >
  );
};

export default observer(CareRoomBooking);
