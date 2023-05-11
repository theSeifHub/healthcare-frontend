import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import theme from "../theme";
import DoctorCard from "../components/DoctorCard";
import stores from "../stores";

const Doctors = () => {
  const {
    spacing,
  } = theme;

  const [searchParams] = useSearchParams();
  const clinicId = searchParams.get("clinic");

  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    Promise.all([
      stores.doctorsStore
        .getDoctorsList(clinicId)
        .then(res => setDoctors(res)),
      stores.doctorsStore
        .getSpecialitiesList()
        .then(res => setSpecialities(res))
    ]);
  }, []);

  return (
    <main style={{
      padding: `${spacing(10)} ${spacing(5)}`,
      display: 'flex',
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      gap: spacing(3),
    }}>
      {doctors.map((dr) =>
        <DoctorCard
          key={dr.id}
          doctorData={dr}
          speciality={specialities.find((sp) => sp.id === dr.speciality)}
          canBook
        />
      )}
    </main>
  );
};

export default Doctors;