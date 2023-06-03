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

const createRowData = (id, pName, pAge, start, incubator, guardian) => ({
  id, pName, pAge, start, incubator, guardian
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
    { title: "Incubator", id: "incubator" },
    { title: "Guardian", id: "guardian" },
  ];


  const incubatorsRows = reservedIncubators.map(inc => {
    const { id, patient, start_date, incubator, gardian_name } = inc;
    const patientName = `${patient.first_name} ${patient.last_name}`;
    const age = getAgeFromBirthDate(patient.date_of_birth);
    const start = dayjs(start_date).format("dddd, MMM D, YYYY");

    return createRowData(
      id, patientName, age, start, incubators[incubator], gardian_name
    );
  });

  return (
    <Box style={{
      marginTop: spacing(2),
      padding: spacing(2),
      border: "gray solid 1px",
      borderRadius: spacing(2),
    }}>
      <p>
        <strong>Currently Occupied Nurseries: </strong>
        {!reservedIncubators.length > 0 && "None"}
      </p>
      {reservedIncubators.length > 0 && (
        <GenericTable headers={headers} rows={incubatorsRows} />
      )}
    </Box>
  );
};

export default observer(Nursery);