import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import theme from "../../theme";
import stores from "../../stores";
import Spinner from "../../components/Spinner";
import GenericTable from "../../components/GenericTable"
import { getAgeFromBirthDate } from "../../utils/dateUtils";
import { icuBeds } from "../../constants";

const createRowData = (id, pName, pAge, start, estimated, bed) => ({
  id, pName, pAge, start, estimated, bed
});

const CareRoom = () => {
  const {
    spacing,
  } = theme;

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    stores.doctorServicesStore
      .getReservedICUBeds()
      .finally(() => setLoadingData(false));
  }, []);

  if (loadingData) {
    return <Spinner size="large" />
  }

  const { reservedICUBeds } = stores.doctorServicesStore;

  const headers = [
    { title: "Id", id: "id" },
    { title: "Patient", id: "pName" },
    { title: "Age", id: "pAge" },
    { title: "Start Day", id: "start" },
    { title: "Estimated Time", id: "estimated" },
    { title: "Bed", id: "bed" },
  ];


  const mapICUBeds = () => {
    const bedsList = [];
    reservedICUBeds.forEach(icuBed => {
      const { id, patient, start_time, estimated_time, bed } = icuBed;
      const patientName = `${patient.first_name} ${patient.last_name}`;
      const age = getAgeFromBirthDate(patient.date_of_birth);
      const start = dayjs(start_time).format("dddd, MMM D, YYYY");
      const estimate = estimated_time.slice(-2) + " days"

      bedsList.push(createRowData(
        id, patientName, age, start, estimate, icuBeds[bed]
      ));
    });
    return bedsList;
  };

  return (
    <Box style={{
      marginTop: spacing(2),
      padding: spacing(2),
      border: "gray solid 1px",
      borderRadius: spacing(2),
    }}>
      <p>
        <strong>Currently Occupied ICU Beds: </strong>
        {!reservedICUBeds.length > 0 && "None"}
      </p>
      {reservedICUBeds.length > 0 && (
        <GenericTable headers={headers} rows={mapICUBeds()} />
      )}
    </Box>
  );
};

export default observer(CareRoom);