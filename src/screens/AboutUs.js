import React from "react";
import theme from "../theme";
import { Paper, Typography } from "@mui/material";

const AboutUs = () => {
  const {
    spacing
  } = theme;

  return (
    <section style={{
      display: "flex",
      alignItems: "center",
    }}>
      <div style={{ margin: spacing(8) }}>
        <img
          alt='doctor and care giver with patient'
          src={require('../assets/img/care-giver-aboutus.png')}
          width={spacing(60)}
          height={spacing(60)}
        />
      </div>
      <Paper elevation={0} style={{
        width: spacing(80),
        height: spacing(40),
        padding: spacing(6),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-between',
      }}>
        <Typography variant='h4' fontFamily='sans-serif'>
          We Take Care Of Your Healthy Life
        </Typography>
        <Typography variant='h6' fontFamily='sans-serif'>
          It's very painful to get rid of obesity. We lead by right, that out of greed, in taking on any greater and guilt hates the times itself, who, whosoever, to make this flight, do not know less.
          It's very painful, but it's easy to get rid of fat. Born in the truth, labors themselves, and pleasures for pleasures, from time to time, do they abandon them?
        </Typography>
      </Paper>
    </section>
  );
};

export default AboutUs;