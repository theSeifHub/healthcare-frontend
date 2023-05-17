import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import StarIcon from '@mui/icons-material/Star';
import theme from "../theme";
import stores from "../stores";
import { Paper, Typography } from "@mui/material";
import Spinner from "../components/Spinner";

const Profile = () => {
  const {
    spacing,
    palette: {
      background
    },
  } = theme;


  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    Promise.all([
      stores.authStore.getCurrentUser(),
      stores.doctorsStore.getSpecialitiesList(),
    ]).then(r => setLoadingData(false))
  }, []);

  if (loadingData) {
    return <Spinner size="large" />
  }

  const { user } = stores.authStore;

  const docSpeciality = stores.doctorsStore.specialitiesList.find(
    sp => sp.id === user.doctor.speciality
  );

  const goldenStars = Math.ceil(Math.random() * 5);
  const darkStars = 5 - goldenStars;
  let key = 0;

  return (
    <main style={{ display: 'flex', minHeight: "83vh" }}>
      <Paper
        style={{
          background: background.default,
          width: spacing(45),
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          gap: spacing(2),
          padding: spacing(2),
        }}
      >
        <img
          alt="Doctor profile"
          src={require("../assets/img/doctor.png")}
          width={spacing(28)}
          height={spacing(28)}
        />
        <Typography variant="h5">
          Dr. {user.doctor.first_name} {user.doctor.last_name}
        </Typography>
        <Typography variant="h6">
          {docSpeciality.name}
        </Typography>

        <p style={{ display: "flex", padding: spacing(0.5), border: "gold solid 0.9px" }}>
          {Array(goldenStars).fill(0).map(s => <StarIcon key={key++} color="golden" fontSize="small" />)}
          {Array(darkStars).fill(0).map(s => <StarIcon key={key++} color="grey" fontSize="small" />)}
        </p>

        <p style={{
          background: "grey",
          padding: spacing(2),
          border: "grey solid",
          borderRadius: spacing(3),
          color: "white",
          fontSize: spacing(2.5),
        }}>
          <span>Graduated from Assiut University</span>
          <br />
          <span>Class: 2014</span>
          <br />
          <span>Experience: 8 years</span>
        </p>
      </Paper>
      <div style={{
        width: "100%",
        display: 'flex',
      }}>

      </div>
    </main>
  );
};

export default observer(Profile);