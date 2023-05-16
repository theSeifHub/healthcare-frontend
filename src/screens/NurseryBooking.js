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
import { incubators } from "../constants";
import { SubmitSuccess } from "../components/SubmitSuccess";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDateDaysAhead } from "../utils/dateUtils";

const NurseryBooking = () => {
  useEffect(() => {
    stores.patientsStore.getPatientsList();
  }, []);

  const { spacing } = theme;
  const navigate = useNavigate();

  const [patient, setPatient] = useState("");
  const [patientError, setPatientError] = useState("");
  const [incubator, setIncubator] = useState("");
  const [incubatorError, setIncubatorError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startDateError, setStartDateError] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [endDateError, setEndDateError] = useState('');

  const [attemptingSubmit, setAttemptingSubmit] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const handleSubmit = async () => {
    setAttemptingSubmit(true);
    setPatientError(patient ? '' : 'Patient Id is required');
    setIncubatorError(incubator ? '' : 'Incubator Id is required');
    setStartDateError(startDate ? '' : 'Start date is required');
    setEndDateError(endDate ? '' : 'End date is required');

    if (dayjs(startDate) > dayjs(endDate)) {
      setEndDateError('End date cannot be before start date');
    } else if (patient && incubator && startDate && endDate) {
      const newService = {
        patient,
        incubator,
        start_date: startDate,
        end_date: endDate
      };

      const res = await stores.doctorServicesStore.createNewDoctorService(
        newService, "incubator",
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

          <Typography variant="h4">Nursery</Typography>
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
                  Incubator:
                </FormLabel>
                <Select
                  value={incubator}
                  displayEmpty
                  defaultValue='none'
                  onChange={(evt) => setIncubator(evt.target.value)}
                  error={!!incubatorError}
                  style={{ width: spacing(45) }}
                >
                  <MenuItem value='none' disabled>Incubator</MenuItem>
                  {Object.entries(incubators).map(([name, id]) => (
                    <MenuItem key={id} value={id}>{name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {incubatorError}
                </FormHelperText>
              </FormControl>

              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(16) }}>
                  Start Date:
                </FormLabel>
                <DatePicker
                  value={startDate}
                  onChange={(evt) => setStartDate(dayjs(evt).format("YYYY-MM-DD"))}
                  inputFormat="DD/MM/YYYY"
                  disablePast
                  maxDate={dayjs(getDateDaysAhead(30))}
                  minDate={dayjs(getDateDaysAhead(0))}
                  openTo="day"
                  renderInput={params => (
                    <TextField
                      {...params}
                      style={{ width: spacing(45) }}
                      variant="outlined"
                      inputProps={{ ...params.inputProps, placeholder: 'DD/MM/YYYY' }}
                      error={!!startDateError}
                    />
                  )}
                />
                <FormHelperText error>{startDateError}</FormHelperText>
              </FormControl>

              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(16) }}>
                  End Date:
                </FormLabel>
                <DatePicker
                  value={endDate}
                  onChange={(evt) => setEndDate(dayjs(evt).format("YYYY-MM-DD"))}
                  inputFormat="DD/MM/YYYY"
                  disablePast
                  maxDate={dayjs(getDateDaysAhead(90))}
                  minDate={dayjs(getDateDaysAhead(2))}
                  openTo="day"
                  renderInput={params => (
                    <TextField
                      {...params}
                      style={{ width: spacing(45) }}
                      variant="outlined"
                      inputProps={{ ...params.inputProps, placeholder: 'DD/MM/YYYY' }}
                      error={!!endDateError}
                    />
                  )}
                />
                <FormHelperText error>{endDateError}</FormHelperText>
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
        src={require('../assets/img/doctor-services/nursery-hero.png')}
        width={spacing(70)} height={spacing(55)}
      />

    </section >
  );
};

export default observer(NurseryBooking);
