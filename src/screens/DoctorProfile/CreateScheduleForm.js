import React, { useState } from "react";
import {
  Paper,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import theme from "../../theme";
import stores from "../../stores";
import { useNavigate } from "react-router-dom";
import { weekDays } from "../../constants";
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const CreateScheduleForm = () => {
  const { spacing } = theme;
  const navigate = useNavigate();

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDaysError, setSelectedDaysError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  const [attemptingSubmit, setAttemptingSubmit] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async () => {
    setSelectedDaysError(selectedDays.length > 0 ? '' : 'Working days are required');
    setStartTimeError(startTime ? '' : 'Start time is required');
    setEndTimeError(endTime ? '' : 'End time is required');

    if (dayjs(startTime, "hh:mm a") > dayjs(endTime, "hh:mm a")) {
      setEndTimeError('End time cannot be before start time');
    } else if (selectedDays.length > 0 && startTime && endTime) {
      setServerError("")
      setAttemptingSubmit(true);
      const newSchedule = {
        days: selectedDays,
        start_time: dayjs(startTime, "hh:mm a").format("HH:mm"),
        end_time: dayjs(endTime, "hh:mm a").format("HH:mm"),
      };

      try {
        await stores.scheduleStore.createDoctorSchedule(newSchedule);
        navigate(0);
      } catch (error) {
        if (error && error.data) {
          setServerError(error.data.error)
        } else {
          setServerError("Unknown error occurred, try again later")
        }
      } finally {
        setAttemptingSubmit(false);
      }
    }
  };

  return (
    <Paper elevation={0} style={{
      width: spacing(80),
      display: 'flex',
      flexDirection: "column",
      gap: spacing(3),
      margin: spacing(10),
    }}>
      <Typography fontWeight="700">You don't have a definite schedule, create one now</Typography>
      <FormControl style={{
        display: 'flex',
        gap: spacing(1),
      }}>
        <FormLabel>Working Days:</FormLabel>
        <Select
          value={selectedDays}
          multiple
          displayEmpty
          defaultValue='none'
          onChange={(evt) => setSelectedDays(evt.target.value)}
          error={!!selectedDaysError}
          style={{ width: "100%" }}
        >
          <MenuItem value='none' disabled>Day</MenuItem>
          {Object.entries(weekDays).map(([id, day]) => (
            <MenuItem key={id} value={id}>{day}</MenuItem>
          ))}
        </Select>
        <FormHelperText error>
          {selectedDaysError}
        </FormHelperText>
      </FormControl>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FormControl style={{ width: "45%" }}>
          <TimePicker
            value={startTime}
            label="Start Time"
            onChange={(newValue) => setStartTime(dayjs(newValue).format("hh:mm a"))}
            renderInput={params => (
              <TextField
                {...params}
                style={{ width: "100%" }}
                variant="outlined"
                inputProps={{ ...params.inputProps, placeholder: 'hh:mm', value: startTime }}
                error={!!startTimeError}
              />
            )}
          />
          <FormHelperText error>{startTimeError}</FormHelperText>
        </FormControl>

        <FormControl style={{ width: "45%" }}>
          <TimePicker
            value={endTime}
            label="End Time"
            onChange={(newValue) => setEndTime(dayjs(newValue).format("hh:mm a"))}
            renderInput={params => (
              <TextField
                {...params}
                style={{ width: "100%" }}
                variant="outlined"
                inputProps={{ ...params.inputProps, placeholder: 'hh:mm', value: endTime }}
                error={!!endTimeError}
              />
            )}
          />
          <FormHelperText error>{endTimeError}</FormHelperText>
        </FormControl>
      </div>

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
        {attemptingSubmit ? "Creating ..." : "Create"}
      </Button>

      {serverError && <Typography color="error" textAlign="center">{serverError}</Typography>}
    </Paper >
  )
}

export default observer(CreateScheduleForm);
