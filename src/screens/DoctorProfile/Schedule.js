import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import stores from "../../stores";
import theme from "../../theme";
import Spinner from "../../components/Spinner";
import GenericTable from "../../components/GenericTable"
import { weekDays } from "../../constants";

const createRowData = (
  id, patientName, patientPhone, patientAge, day, from, to,
) => ({ id, patientName, patientPhone, patientAge, day, from, to });

const Schedule = () => {
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    // TODO Update with actual dr ID
    stores.scheduleStore
      .getDoctorSchedule(1)
      .then(r => setLoadingData(false));
    // stores.scheduleStore.getReservedAppointments(),
  }, []);

  if (loadingData) {
    return <Spinner size="large" />
  }

  const { currentDrScheduleDetails: {
    days,
    end_time,
    start_time,
    appointments,
  } } = stores.scheduleStore;

  const headers = [
    { title: "Id", id: "id" },
    { title: "Patient", id: "patientName" },
    { title: "Phone", id: "patientPhone" },
    { title: "Age", id: "patientAge" },
    { title: "Day", id: "day" },
    { title: "From", id: "from" },
    { title: "To", id: "to" },
  ];

  const rows = (() => {
    const reservedAppointments = [];
    appointments.forEach(app => {
      if (app.patient) {
        const { id, patient, start_time, end_time } = app;
        const patientName = `${patient.first_name} ${patient.last_name}`;
        const age = () => {
          const years = dayjs().diff(dayjs(patient.date_of_birth), 'year');
          if (years > 0) {
            return `${years} years`;
          }
          const months = dayjs().diff(dayjs(patient.date_of_birth), 'month');
          if (months > 0) {
            return `${months} months`;
          }
          const days = dayjs().diff(dayjs(patient.date_of_birth), 'day');
          if (days > 0) {
            return `${days} days`;
          }
        };
        const day = dayjs(start_time).format("dddd, MMM D, YYYY");
        const from = dayjs(start_time).format("hh:mm a");
        const to = dayjs(end_time).format("hh:mm a");
        reservedAppointments.push(createRowData(id, patientName, patient.phone_number, age(), day, from, to));
      }
    });
    return reservedAppointments;
  })();

  const {
    spacing,
  } = theme;

  return (
    <>
      <Typography
        variant='h6'
        fontFamily='sans-serif'
        fontWeight="bold"
        textAlign="center"
      >
        Current Schedule
      </Typography>
      <Box style={{
        marginTop: spacing(2),
        padding: spacing(2),
        border: "gray solid 1px",
        borderRadius: spacing(2),
      }}>
        <p>
          <strong>Days: </strong>
          {days.map((d, i) => <span key={i}>{weekDays[d]}{i < days.length - 1 && ", "}</span>)}
        </p>
        <p>
          <strong>Time: </strong>
          <span>
            {dayjs(start_time, 'HH:mm:ss').format("hh:mm a")}
            -
            {dayjs(end_time, 'HH:mm:ss').format("hh:mm a")}
          </span>
        </p>
        <p>
          <strong>Upcoming Appointments: </strong>
        </p>
        <GenericTable headers={headers} rows={rows} />
      </Box>
    </>
  );
};

export default observer(Schedule);