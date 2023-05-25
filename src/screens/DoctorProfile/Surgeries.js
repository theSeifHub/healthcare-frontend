import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import theme from "../../theme";
import stores from "../../stores";
import Spinner from "../../components/Spinner";
import GenericTable from "../../components/GenericTable"
import { getAgeFromBirthDate } from "../../utils/dateUtils";
import { surgeryTypes, surgeryRooms } from "../../constants";

const createRowData = (id, doctors, day, time, pName, pAge, room, type) => ({
  id, doctors, day, time, pName, pAge, room, type
});

const Surgeries = () => {
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    Promise.all([
      stores.doctorServicesStore.getSurgeries("upcoming"),
      stores.doctorServicesStore.getSurgeries("past"),
    ]).finally(() => setLoadingData(false));
  }, []);

  if (loadingData) {
    return <Spinner size="large" />
  }

  const { upcomingSurgeries, pastSurgeries } = stores.doctorServicesStore;

  const headers = [
    { title: "Id", id: "id" },
    { title: "Doctors", id: "doctors" },
    { title: "Day", id: "day" },
    { title: "Time", id: "time" },
    { title: "Patient", id: "pName" },
    { title: "Age", id: "pAge" },
    { title: "Room", id: "room" },
    { title: "Type", id: "type" },
  ];


  const mapSurgeries = (surgeriesList) => {
    const surgeries = [];
    surgeriesList.forEach(surg => {
      const { id, room, start_time, surgery_type, patient, doctors } = surg;
      const patientName = `${patient.first_name} ${patient.last_name}`;
      const age = getAgeFromBirthDate(patient.date_of_birth);
      const day = dayjs(start_time).format("dddd, MMM D, YYYY");
      const time = dayjs(start_time).format("hh:mm a");
      let drsNames = doctors.map(dr => `Dr. ${dr.first_name} ${dr.last_name}, `).join("");
      surgeries.push(createRowData(
        id, drsNames.substring(0, drsNames.length - 2), day, time, patientName, age, surgeryRooms[room], surgeryTypes[surgery_type],
      ));
    });
    return surgeries;
  };

  const {
    spacing,
  } = theme;

  return (
    <>
      <Box style={{
        marginTop: spacing(2),
        padding: spacing(2),
        border: "gray solid 1px",
        borderRadius: spacing(2),
      }}>
        <p>
          <strong>Upcoming Surgeries: </strong>
          {!upcomingSurgeries.length > 0 && "None"}
        </p>
        {upcomingSurgeries.length > 0 && (
          <GenericTable headers={headers} rows={mapSurgeries(upcomingSurgeries)} />
        )}
      </Box>

      <br />

      <Box style={{
        marginTop: spacing(2),
        padding: spacing(2),
        border: "gray solid 1px",
        borderRadius: spacing(2),
      }}>
        <p>
          <strong>Past Surgeries: </strong>
          {!pastSurgeries.length > 0 && "None"}
        </p>
        {pastSurgeries.length > 0 && (
          <GenericTable headers={headers} rows={mapSurgeries(pastSurgeries)} />
        )}
      </Box>
    </>
  );
};

export default observer(Surgeries);