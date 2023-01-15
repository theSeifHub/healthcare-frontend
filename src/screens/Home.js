import React from "react";
import theme from "../theme";
import { Link as RouterLink } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  const {
    spacing,
    palette: { primary }
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
            <Typography variant='h4'>Stay healthy and safe!!</Typography>
            <Typography variant='h6'>With Us You Can Keep Healthy</Typography>
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
      <section style={{ display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "dashed" }}>Section 2</section>
      <section style={{ display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "dashed" }}>Section 3</section>
      <section style={{ display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "dashed" }}>Section 4</section>
    </>
  );
};

export default Home;