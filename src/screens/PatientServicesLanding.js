import React from "react";
import { useNavigate } from 'react-router-dom';
import theme from "../theme";
import { Paper, Typography, Button } from "@mui/material";

const PatientServicesLanding = () => {
  const {
    spacing,
    palette: {
      background,
    }
  } = theme;

  const navigate = useNavigate();
  return (
    <section style={{ padding: spacing(2) }}>
      <Typography variant='h4' fontFamily='sans-serif' style={{ textAlign: "center", marginBottom: spacing(4) }}>
        Our Services
      </Typography>

      <div style={{
        width: spacing(150),
        display: "flex",
        flexWrap: "wrap",
        margin: `${spacing(1)} auto`,
        alignItems: "center",
        justifyContent: 'space-between',
        gap: spacing(5),
      }}>

        <Paper elevation={0} style={{
          background: background.default,
          width: spacing(65),
          height: spacing(25),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'space-between',
          padding: `${spacing(2)} ${spacing(3)}`,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-between',
            width: "90%",
          }}>
            <div style={{
              width: spacing(13),
              background: background.paper,
              borderRadius: spacing(4),
              alignSelf: "start",
            }}>
              <img
                alt='nurse with syringe'
                src={require('../assets/img/services-injection.png')}
                width={spacing(12)} height={spacing(13)}
              />
            </div>
            <Typography
              variant='h5'
              fontFamily='sans-serif'
              fontWeight="bold"
              style={{ width: spacing(40) }}
            >
              Injection with hollow needle and syringe
            </Typography>
          </div>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/')}
            style={{ width: spacing(15), borderRadius: spacing(1), alignSelf: "end" }}
          >
            Order
          </Button>
        </Paper>


        <Paper elevation={0} style={{
          background: background.default,
          width: spacing(65),
          height: spacing(25),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'space-between',
          padding: `${spacing(2)} ${spacing(3)}`,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-between',
            width: "90%",
          }}>
            <div style={{
              width: spacing(13),
              background: background.paper,
              borderRadius: spacing(4),
              alignSelf: "start",
            }}>
              <img
                alt='hospital building'
                src={require('../assets/img/services-hospital.png')}
                width={spacing(12)} height={spacing(13)}
              />
            </div>
            <Typography
              variant='h5'
              fontFamily='sans-serif'
              fontWeight="bold"
            >
              Several Clinics
            </Typography>
          </div>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/patient/services/clinics')}
            style={{ width: spacing(15), borderRadius: spacing(1), alignSelf: "end" }}
          >
            View
          </Button>
        </Paper>


        <Paper elevation={0} style={{
          background: background.default,
          width: spacing(65),
          height: spacing(25),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'space-between',
          padding: `${spacing(2)} ${spacing(3)}`,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-between',
            width: "100%",
          }}>
            <img
              alt='patient receiving suspended solution'
              src={require('../assets/img/services-solution.png')}
              width={spacing(18)} height={spacing(18)}
            />
            <Typography
              variant='h5'
              fontFamily='sans-serif'
              fontWeight="bold"
              style={{ width: spacing(40) }}
            >
              Dehydration treatment after illness
            </Typography>
          </div>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/')}
            style={{ width: spacing(15), borderRadius: spacing(1), alignSelf: "end" }}
          >
            Order
          </Button>
        </Paper>


        <Paper elevation={0} style={{
          background: background.default,
          width: spacing(65),
          height: spacing(25),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'space-between',
          padding: `${spacing(2)} ${spacing(3)}`,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-between',
            width: "100%",
          }}>
            <div style={{
              width: spacing(15),
              background: background.paper,
              borderRadius: spacing(4),
              alignSelf: "start",
            }}>
              <img
                alt='wound bandage'
                src={require('../assets/img/services-bandage.png')}
                width={spacing(14)} height={spacing(14)}
              />
            </div>
            <Typography
              variant='h5'
              fontFamily='sans-serif'
              fontWeight="bold"
              style={{ width: spacing(40) }}
            >
              Wounds sterilization and treatment
            </Typography>
          </div>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/')}
            style={{ width: spacing(15), borderRadius: spacing(1), alignSelf: "end" }}
          >
            Order
          </Button>
        </Paper>
      </div>
    </section>
  );
};

export default PatientServicesLanding;