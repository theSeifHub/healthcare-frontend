import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import theme from "../../theme";
import stores from "../../stores";
import GenericTable from "../../components/GenericTable";
import Spinner from "../../components/Spinner";
import { getAgeFromBirthDate } from "../../utils/dateUtils";

const createRowData = (service, pName, pAge, phone, time) => ({
  service, pName, pAge, phone, time
});

const PatientServices = () => {
  const [loadingScreen, setLoadingScreen] = useState(true);

  const { spacing } = theme;

  useEffect(() => {
    stores.patientsStore
      .getPatientServicesList()
      .finally(() => setLoadingScreen(false));
  }, []);

  if (loadingScreen) {
    return <Spinner size="large" />
  }

  const { patientsServicesList } = stores.patientsStore;

  const headers = [
    { title: "Service", id: "service" },
    { title: "Patient", id: "pName" },
    { title: "Age", id: "pAge" },
    { title: "Phone", id: "phone" },
    { title: "Time", id: "time" },
  ];

  const servicesRows = patientsServicesList.map(({ id, name, patient, time }) => {
    const serviceId = `${name} #${id}`
    const patientName = `${patient.first_name} ${patient.last_name}`;
    const age = getAgeFromBirthDate(patient.date_of_birth);
    const formattedTime = dayjs(time).format("ddd, MMM D, YYYY");

    return createRowData(serviceId, patientName, age, patient.phone_number, formattedTime);
  })


  return (
    <Box style={{
      marginTop: spacing(2),
      padding: spacing(2),
      border: "gray solid 1px",
      borderRadius: spacing(2),
    }}>
      <p>
        <strong>Patient Services: </strong>
        {!patientsServicesList.length > 0 && "None"}
      </p>
      {patientsServicesList.length > 0 && (
        <GenericTable headers={headers} rows={servicesRows} />
      )}
    </Box>
  );
};

export default observer(PatientServices);