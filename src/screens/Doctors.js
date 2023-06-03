import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import theme from "../theme";
import DoctorCard from "../components/DoctorCard";
import stores from "../stores";
import Spinner from "../components/Spinner";

const Doctors = () => {
  const {
    spacing,
  } = theme;

  const [searchParams] = useSearchParams();
  const clinicId = searchParams.get("clinic");

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    Promise.all([
      stores.doctorsStore.getDoctorsList(clinicId),
      stores.doctorsStore.getSpecialitiesList(),
    ]).finally(() => setLoadingData(false));
  }, [clinicId]);

  if (loadingData) {
    return <Spinner size="large" />
  }

  const { doctorsList, specialitiesList } = stores.doctorsStore;

  const findSpec = (drSpecialityId) => {
    const speciality = specialitiesList.find(
      (sp) => sp.id === drSpecialityId
    );
    return speciality;
  }


  return (
    <main style={{
      padding: `${spacing(10)} ${spacing(5)}`,
      display: 'flex',
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      gap: spacing(3),
    }}>
      {doctorsList.length > 0 ? doctorsList.map((dr) =>
        <DoctorCard
          key={dr.id}
          doctorData={dr}
          speciality={findSpec(dr.speciality)}
          canBook
        />
      ) : (
        <Box style={{
          width: spacing(50),
          marginTop: spacing(2),
          padding: spacing(2),
          border: "gray solid 1px",
          borderRadius: spacing(1),
        }}>
          <Typography variant="h5" textAlign="center">
            No Doctors Found!
          </Typography>
        </Box>
      )}
    </main>
  );
};

export default observer(Doctors);