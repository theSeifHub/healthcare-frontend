import React from "react";
import theme from "../theme";
import { Link as RouterLink } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomBadge from "../components/CustomBadge";
import DoctorCard from "../components/DoctorCard";
import {
  appointmentsPreview,
  specialitiesPreview,
  doctorsPreview,
} from "../constants";

const Home = () => {
  const {
    spacing,
    palette: { primary, background }
  } = theme;
  return (
    <>
      <section style={{ marginTop: spacing(2), display: "flex" }}>
        <div>
          <img
            alt='hero: doctor amusing child in their office'
            src={require('../assets/img/home/hero.png')}
            width={spacing(70)} height={spacing(55)}
          />
        </div>
        <div style={{
          width: spacing(80),
          display: "flex",
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: 'space-between',
          padding: spacing(6),
        }}>
          <Paper elevation={0} style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
          }}>
            <Typography variant='h3' fontFamily='Impact'>Stay healthy and safe!!</Typography>
            <Typography variant='h5' fontFamily='serif'>With Us You Can Keep Healthy</Typography>
          </Paper>
          <RouterLink to={"/contact-us"} style={{ textDecoration: "none", alignSelf: "flex-end" }}>
            <Typography
              variant="button"
              color={primary.contrastText}
              style={{
                width: spacing(22),
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: spacing(1),
                background: primary.main,
                padding: `${spacing(0.5)} ${spacing(1)}`,
              }}
              fontSize={spacing(2.5)}
            >
              Contact Us
              <ArrowForwardIcon
                fontSize="medium"
                viewBox={'5 2 15 20'}
                preserveAspectRatio='none'
              />
            </Typography>
          </RouterLink>
        </div>
      </section>

      <section style={{ background: background.default, padding: `${spacing(7)} ${spacing(3)}` }}>
        <Typography variant="h3" style={{ textAlign: 'center', marginBottom: spacing(5) }}>
          Discover The Online Appointment!
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: spacing(5) }}>
          {appointmentsPreview.map((item, index) => (
            <Paper key={index} style={{
              height: spacing(55),
              flex: 1,
              display: 'flex',
              flexDirection: "column",
              alignItems: "center",
              rowGap: spacing(3),
              padding: `${spacing(5)} ${spacing(2)}`,
            }}>
              <img
                src={require(`../assets/img/home/${item.img}`)}
                alt={item.alt}
                width={spacing(36)}
                height={spacing(40)}
              />
              <Typography
                fontFamily='sans-serif'
                variant='body2'
                fontSize={spacing(2.5)}
                textAlign="center"
              >
                {item.description}
              </Typography>
            </Paper>
          ))}
        </div>
      </section>

      <section style={{ padding: `${spacing(7)} ${spacing(3)}` }}>
        <Typography variant="h3" style={{ textAlign: 'center', marginBottom: spacing(5) }}>
          Clinics and Specialties
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", gap: spacing(6) }}>
          {specialitiesPreview.map((spec, index) => (
            <div key={index}>
              <CustomBadge badgeContent={''} color="secondary">
                <Paper elevation={3} style={{
                  width: spacing(25),
                  height: spacing(25),
                  borderRadius: spacing(12),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <img
                    alt={spec.alt}
                    src={require(`../assets/img/home/${spec.img}`)}
                    width={spacing(18)}
                    height={spacing(18)}
                  />
                </Paper>
              </CustomBadge>
              <Typography fontSize={spacing(3)} textAlign='center' style={{ margin: `${spacing(3)} 0` }}>
                {spec.title}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: background.default, padding: `${spacing(7)} ${spacing(3)}` }}>
        <Typography variant="h3" textAlign='center'>
          Our Doctors
        </Typography>
        <Typography
          variant="body1"
          fontFamily='serif'
          fontSize={spacing(2.5)}
          textAlign='center'
          style={{ margin: spacing(5) }}
        >
          Our team of medical experts is there for you, from finding the right doctors and hospitals to booking appointments
          and giving any kind of medical help in between.
        </Typography>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing(5),
        }}>
          {doctorsPreview.map((doc, index) => (
            <DoctorCard doctorData={doc} key={index} speciality={{ name: doc.speciality }} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;