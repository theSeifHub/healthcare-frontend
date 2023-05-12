import React from "react";
import { useNavigate } from 'react-router-dom';
import theme from "../theme";
import { Paper, Typography, Button } from "@mui/material";
import { doctorServicesListings } from "../constants"

const DoctorServices = () => {
  const {
    spacing,
    palette,
  } = theme;

  const navigate = useNavigate();
  return (
    <section style={{
      padding: spacing(2),
      width: spacing(120),
      display: "flex",
      flexWrap: "wrap",
      margin: `${spacing(1)} auto`,
      alignItems: "center",
      justifyContent: 'space-around',
      gap: spacing(3),
    }}>

      {doctorServicesListings.map((service) => (
        <Paper elevation={0} key={service.id} style={{
          background: palette.grey[300],
          width: spacing(45),
          height: spacing(40),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'space-between',
          padding: `${spacing(2)} ${spacing(3)}`,
        }}>

          <img
            alt='nurse with syringe'
            src={require(`../assets/img/doctor-services/${service.image}`)}
            width={spacing(15)} height={spacing(15)}
          />

          <Typography
            variant='h5'
            fontFamily='sans-serif'
            fontWeight="bold"
          >
            {service.title}
          </Typography>
          <Typography
            variant='body1'
            fontFamily='sans-serif'
            style={{ width: "100%" }}
            textAlign="center"
          >
            {service.description}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate(`/doctor/services/${service.id}`)}
            style={{ width: spacing(15), borderRadius: spacing(15) }}
          >
            Book
          </Button>
        </Paper>
      ))}
    </section>
  );
};

export default DoctorServices;