import React from "react";
import theme from "../theme";
import { Link as RouterLink } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const appointmentsItems = [
  {
    img: 'view_doctor.png',
    alt: 'view doctor',
    description: 'Share your health concern here and we shall assign you a top doctor across the North East',
  },
  {
    img: 'book_visit.png',
    alt: 'book a visit',
    description: 'Book your time slot with doctor from your comfort zone',
  },
  {
    img: 'find_doctor.png',
    alt: 'find a doctor',
    description: 'With more than 1000+ doctors and on mission to provide best care Health Care Service',
  },
];

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
            src={require('../assets/img/hero.png')}
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
          {appointmentsItems.map((item, index) => (
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
                src={require(`../assets/img/${item.img}`)}
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
      <section style={{ display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "dashed" }}>Section 3</section>
      <section style={{ display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "dashed" }}>Section 4</section>
    </>
  );
};

export default Home;