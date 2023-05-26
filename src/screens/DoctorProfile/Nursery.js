import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import theme from "../../theme";
import stores from "../../stores";
import Spinner from "../../components/Spinner";
import GenericTable from "../../components/GenericTable"
import { getAgeFromBirthDate } from "../../utils/dateUtils";
import { incubators } from "../../constants";

const createRowData = (id, pName, pAge, start, end, incubator, guardian) => ({
  id, pName, pAge, start, end, incubator, guardian
});

const Nursery = () => {
  const {
    spacing,
  } = theme;

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    stores.doctorServicesStore
      .getReservedIncubators()
      .finally(() => setLoadingData(false));
  }, []);

  if (loadingData) {
    return <Spinner size="large" />
  }

  const { reservedIncubators } = stores.doctorServicesStore;

  const headers = [
    { title: "Id", id: "id" },
    { title: "Patient", id: "pName" },
    { title: "Age", id: "pAge" },
    { title: "Start Day", id: "start" },
    { title: "End Day", id: "end" },
    { title: "Incubator", id: "incubator" },
    { title: "Guardian", id: "guardian" },
  ];


  const mapIncubators = () => {
    const incubatorsList = [];
    reservedIncubators.forEach(inc => {
      // TODO update to correct response interface after fixed
      const { id, patient, start_date, end_date, incubator_id, guardian_name } = inc;
      const patientName = `${patient.first_name} ${patient.last_name}`;
      const age = getAgeFromBirthDate(patient.date_of_birth);
      const start = dayjs(start_date).format("dddd, MMM D, YYYY");
      const end = dayjs(end_date).format("dddd, MMM D, YYYY");

      incubatorsList.push(createRowData(
        id, patientName, age, start, end, incubators[incubator_id], guardian_name
      ));
    });
    return incubatorsList;
  };

  return (
    <Box style={{
      marginTop: spacing(2),
      padding: spacing(2),
      border: "gray solid 1px",
      borderRadius: spacing(2),
    }}>
      <p>
        <strong>Reserved Nurseries: </strong>
        {!reservedIncubators.length > 0 && "None"}
      </p>
      {reservedIncubators.length > 0 && (
        <GenericTable headers={headers} rows={mapIncubators()} />
      )}
    </Box>
  );
};

export default observer(Nursery);