import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import stores from "../../stores";
import GenericTable from "../../components/GenericTable"

const createRowData = (
  id, patientName, patientPhone, patientAge, day, from, to,
) => ({ id, patientName, patientPhone, patientAge, day, from, to });

const Schedule = ({ currentTab }) => {
  if (currentTab !== "schedule") {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    stores.scheduleStore.getDoctorSchedule(1);
    stores.scheduleStore.getReservedAppointments();
  }, []);

  const headers = [
    { title: "Id", id: "id" },
    { title: "Patient", id: "patientName" },
    { title: "Phone", id: "patientPhone" },
    { title: "Age", id: "patientAge" },
    { title: "Day", id: "day" },
    { title: "From", id: "from" },
    { title: "To", id: "to" },
  ];

  const rows = stores.scheduleStore.reservedAppointments.map(app => {
    const { patient } = app;
    const patientName = `${patient.first_name} ${patient.last_name}`;
    const age = dayjs().diff(dayjs(patient.date_of_birth), 'year');
    const day = dayjs(app.start_time).format("dddd, MMM D, YYYY");
    const from = dayjs(app.start_time).format("hh:mm a");
    const to = dayjs(app.end_time).format("hh:mm a");
    return createRowData(app.id, patientName, patient.phone_number, age, day, from, to);
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <Typography
        variant='h6'
        fontFamily='sans-serif'
        fontWeight="bold"
        textAlign="center"
      >
        Doctor Schedule
      </Typography>
      <Typography>

      </Typography>
      { }
      <GenericTable headers={headers} rows={rows} />
    </div >
  );
};

export default observer(Schedule);