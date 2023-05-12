import React, { useState } from "react";
import dayjs from 'dayjs';
import {
  Paper,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate, useSearchParams } from 'react-router-dom';
import theme from "../theme";
import stores from "../stores";
import { getDateDaysAhead } from "../utils/dateUtils";
import { patientServicesData } from "../constants";

const PatientServiceBook = () => {
  const { spacing } = theme;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service");

  const serviceData = patientServicesData[serviceId];

  const { user: currentPatient } = stores.authStore;
  const patientName = `${currentPatient.patient.first_name} ${currentPatient.patient.last_name}`;


  const [attemptingBook, setAttemptingBook] = useState(false);

  const [day, setDay] = useState(null);
  const [dayError, setDayError] = useState('');

  const [bookingError, setBookingError] = useState('');
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const handleBook = async () => {
    setAttemptingBook(true);
    setDayError(day ? '' : 'Day is required');
    if (patientName && day) {
      setBookingError('');
      const newService = {
        name: serviceData.id,
        patient: currentPatient.patient.id,
        time: day
      };
      try {
        const res = await stores.patientsStore.createNewPatientService(newService);
        if (res) {
          setSuccessfulSubmission(true);
          setTimeout(
            () => navigate('/patient/services'),
            2000,
          )
        }
      } catch (err) {
        setBookingError(`${err.status}: ${err.data.time[0]}`);
      }
    }
    setAttemptingBook(false);
  };

  return (
    <section style={{
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
      paddingTop: spacing(10),
      flexGrow: 1,
    }}>
      <Typography variant="h4" fontWeight="700">
        {serviceData.title}
      </Typography>

      <div style={{
        height: spacing(50),
        width: spacing(120),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Paper elevation={0} style={{
          width: spacing(70),
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          gap: spacing(3),
          margin: spacing(4),
          border: successfulSubmission ? "green dotted" : "",
        }}>
          {successfulSubmission ? (
            <>
              <Typography variant="h5" fontWeight="700" style={{ color: "green", marginTop: spacing(3) }}>
                Submitted Successfully
              </Typography>
              <CheckCircleOutlineIcon color="success" style={{
                width: spacing(20), height: spacing(20)
              }} />
            </>
          ) : (
            <>
              <div style={{ height: spacing(5) }}>
                {!!bookingError && (
                  <Typography variant="subtitle1" color="error" textAlign="center">{bookingError}</Typography>
                )}
              </div>

              <FormControl style={{ width: "100%" }}>
                <FormLabel style={{ marginBottom: spacing(1) }}>Patient Name</FormLabel>
                <TextField
                  value={patientName}
                  onChange={(evt) => evt.preventDefault()}
                  variant="outlined"
                  disabled
                />
              </FormControl>

              <FormControl style={{ width: "100%" }}>
                <FormLabel style={{ marginBottom: spacing(1) }}>Day</FormLabel>
                <DatePicker
                  value={day}
                  onChange={(evt) => setDay(dayjs(evt).format("YYYY-MM-DD"))}
                  inputFormat="DD/MM/YYYY"
                  disablePast
                  maxDate={dayjs(getDateDaysAhead(15))}
                  minDate={dayjs(getDateDaysAhead(1))}
                  openTo="day"
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      inputProps={{ ...params.inputProps, placeholder: 'DD/MM/YYYY' }}
                      error={!!dayError}
                      helperText={dayError}
                    />
                  )}
                />
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleBook}
                disabled={attemptingBook}
                style={{ width: spacing(20), alignSelf: "flex-end", marginTop: spacing(3) }}
              >
                {attemptingBook ? "Submitting ..." : "Submit"}
              </Button>
            </>
          )}
        </Paper>
        <Paper elevation={0} style={{
          display: 'flex',
          alignItems: "center",
          justifyContent: "center",
          gap: spacing(3),
          marginBottom: spacing(5),
        }}>
          <img
            alt={serviceData.title}
            src={require(`../assets/img/${serviceData.image}`)}
            width={spacing(32)}
            height={spacing(32)}
          />
        </Paper>
      </div >
    </section >
  );
};

export default PatientServiceBook;
