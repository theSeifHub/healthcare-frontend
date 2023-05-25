import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import stores from "../../stores";
import theme from "../../theme";
import Spinner from "../../components/Spinner";
import GenericTable from "../../components/GenericTable"
import { weekDays } from "../../constants";
import { getAgeFromBirthDate } from "../../utils/dateUtils";
import { CreateScheduleForm } from "./CreateScheduleForm";

const createRowData = (
  id, patientName, patientPhone, patientAge, day, from, to,
) => ({ id, patientName, patientPhone, patientAge, day, from, to });

const Schedule = () => {
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    stores.scheduleStore
      // TODO Update with actual dr ID
      .getDoctorSchedule(1)
      .finally(() => setLoadingData(false));
  }, []);

  if (loadingData) {
    return <Spinner size="large" />
  }

  if (!stores.scheduleStore.currentDrScheduleDetails) {
    return <CreateScheduleForm />
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

  const appointmentRows = (() => {
    const reservedAppointments = [];
    appointments.forEach(app => {
      if (app.patient) {
        const { id, patient, start_time, end_time } = app;
        const patientName = `${patient.first_name} ${patient.last_name}`;
        const age = getAgeFromBirthDate(patient.date_of_birth);
        const day = dayjs(start_time).format("dddd, MMM D, YYYY");
        const from = dayjs(start_time).format("hh:mm a");
        const to = dayjs(end_time).format("hh:mm a");
        reservedAppointments.push(createRowData(id, patientName, patient.phone_number, age, day, from, to));
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
            {`${dayjs(start_time, 'HH:mm:ss').format("hh:mm a")}
             - ${dayjs(end_time, 'HH:mm:ss').format("hh:mm a")}`}
          </span>
        </p>
        <p>
          <strong>Upcoming Appointments: </strong>
          {!appointmentRows.length > 0 && "None"}
        </p>
        {appointmentRows.length > 0 && <GenericTable headers={headers} rows={appointmentRows} />}
      </Box>
    </>
  );
};

export default observer(Schedule);