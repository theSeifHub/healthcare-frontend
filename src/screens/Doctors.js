import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
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
    ]).then(res => setLoadingData(false));
  }, [clinicId]);

  if (loadingData) {
    return <Spinner size="large" />
  }

  const findSpec = (drSpecialityId) => {
    const speciality = stores.doctorsStore.specialitiesList.find(
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
      {stores.doctorsStore.doctorsList.map((dr) =>
        <DoctorCard
          key={dr.id}
          doctorData={dr}
          speciality={findSpec(dr.speciality)}
          canBook
        />
      )}
    </main>
  );
};

export default observer(Doctors);