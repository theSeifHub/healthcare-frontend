import React from "react";
import { useNavigate } from 'react-router-dom';
import theme from "../theme";
import { Paper, Typography, Button } from "@mui/material";

const DoctorServicesLanding = () => {
  const {
    spacing
  } = theme;

  const navigate = useNavigate();
  return (
    <section style={{
      display: "flex",
      alignItems: "center",
    }}>
      <Paper elevation={0} style={{
        width: spacing(80),
        height: spacing(35),
        padding: spacing(12),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-between',
      }}>
        <Typography variant='h4' fontFamily='sans-serif'>
          We present a lot of services that help the doctors to perform their missions in the best way!
        </Typography>
        <Typography variant='h5' fontFamily='sans-serif'>
          If you are interested as a doctor,
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
          style={{ width: spacing(25), borderRadius: spacing(5), alignSelf: "center" }}
        >
          Click Here
        </Button>
      </Paper>
      <div style={{ margin: spacing(8) }}>
        <img
          alt='doctor and care giver with patient'
          src={require('../assets/img/doctors-in-lab.png')}
          width={spacing(60)}
          height={spacing(60)}
        />
      </div>
    </section>
  );
};

export default DoctorServicesLanding;