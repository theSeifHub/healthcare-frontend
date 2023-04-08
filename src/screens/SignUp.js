import React from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Button,
} from "@mui/material";
import theme from "../theme";

const SignUp = () => {
  const {
    spacing,
    palette: {
      primary,
    },
  } = theme;
  return (
    <main style={{ paddingTop: spacing(10), display: 'flex', justifyContent: "space-evenly" }}>
      <Link to="/sign-up/doctor" style={{ textDecoration: "none" }}>
        <Paper
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: spacing(30),
            height: spacing(40),
            padding: spacing(2),
            borderRadius: spacing(3),
          }}
        >
          <img
            alt="signup as doctor"
            src={require("../assets/img/doctor.png")}
            width={spacing(30)}
            height={spacing(30)}
            style={{ marginBottom: spacing(5) }}
          />
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            style={{
              width: spacing(15),
              background: primary.main,
              padding: `${spacing(0.5)} ${spacing(1)}`
            }}
          >Doctor
          </Button>
        </Paper>
      </Link>

      <Link to="/sign-up/patient" style={{ textDecoration: "none" }}>
        <Paper
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: spacing(30),
            height: spacing(40),
            padding: spacing(2),
            borderRadius: spacing(3),
          }}
        >
          <img
            alt="signup as patient"
            src={require("../assets/img/patient.png")}
            width={spacing(30)}
            height={spacing(30)}
            style={{ marginBottom: spacing(5) }}
          />
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            style={{
              width: spacing(15),
              background: primary.main,
              padding: `${spacing(0.5)} ${spacing(1)}`
            }}
          >
            Patient
          </Button>
        </Paper>
      </Link>
    </main>
  )
}

export default SignUp;
