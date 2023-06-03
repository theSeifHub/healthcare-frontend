import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
} from "@mui/material";
import theme from "../theme";
import stores from "../stores";
import Spinner from "../components/Spinner";

const Clinics = () => {
  const [loadingData, setLoadingData] = useState(true);

  const {
    spacing,
    palette: {
      background,
    }
  } = theme;

  useEffect(() => {
    stores.doctorsStore
      .getSpecialitiesList()
      .finally(() => setLoadingData(false));
  }, []);

  if (loadingData) {
    return <Spinner size="large" />
  }
  return (
    <main style={{
      padding: spacing(4),
      display: 'flex',
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <Typography
        variant='h4'
        fontFamily='sans-serif'
        fontWeight="bold"
        textAlign="center"
      >
        Clinics
      </Typography>
      <div style={{
        margin: spacing(3),
        padding: spacing(4),
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {stores.doctorsStore.specialitiesList.map((sp) => (
          <Link
            key={sp.id}
            style={{ textDecoration: "none", width: "45%" }}
            to={`/doctors?clinic=${sp.id}`}
          >
            <Paper
              elevation={3}
              style={{
                background: background.default,
                margin: spacing(3),
                height: spacing(10),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant='h6'
                fontFamily='sans-serif'
                fontWeight="bold"
              >
                {sp.name}
              </Typography>
            </Paper>
          </Link>
        ))}
      </div>
    </main >
  );
};

export default observer(Clinics);