import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import StarIcon from '@mui/icons-material/Star';
import { Tabs, Tab, Paper, Typography } from "@mui/material";
import theme from "../../theme";
import stores from "../../stores";
import Spinner from "../../components/Spinner";
import { doctorProfileTabs } from "../../constants";
import ScheduleTab from "./Schedule"
import SurgeriesTab from "./Surgeries"
import BloodBankTab from "./BloodBank"
// import NurseryTab from "./Nursery"
// import CareRoomTab from "./CareRoom"
// import PatientServicesTab from "./PatientServices"

const renderCurrentTab = (tabId) => {
  switch (tabId) {
    case "schedule":
      return <ScheduleTab />
    case "surgeries":
      return <SurgeriesTab />
    case "bloodbank":
      return <BloodBankTab />
    // case "nursery":
    //   return <NurseryTab />
    // case "care-room":
    //   return <CareRoomTab />
    // case "patient-services":
    //   return <PatientServicesTab />
    default:
      return <ScheduleTab />
  }
}
const DoctorProfile = ({ goToTab }) => {
  const {
    spacing,
    palette: {
      background,
    },
  } = theme;

  const [loadingData, setLoadingData] = useState(true);
  const [currentTab, setCurrentTab] = useState(goToTab || "schedule");

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };


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

  const speciality = stores.doctorsStore.specialitiesList.find(
    sp => sp.id === user.doctor.speciality
  );

  // const goldenStars = Math.ceil(Math.random() * 5);
  // const darkStars = 5 - goldenStars;

  return (
    <main style={{ display: 'flex' }}>
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
          src={require("../../assets/img/doctor.png")}
          width={spacing(28)}
          height={spacing(28)}
        />
        <Typography variant="h5">
          Dr. {user.doctor.first_name} {user.doctor.last_name}
        </Typography>
        <Typography variant="h6">
          {speciality.name}
        </Typography>

        <p style={{ display: "flex", padding: spacing(0.5), border: "gold solid 0.9px" }}>
          {Array(4).fill(0).map((s, i) => <StarIcon key={i} color="golden" fontSize="small" />)}
          {Array(1).fill(0).map((s, i) => <StarIcon key={i} color="grey" fontSize="small" />)}
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
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          style={{ height: spacing(6), width: "100%", borderBottom: "lightgrey solid" }}
        >
          {doctorProfileTabs.map(tab => {
            return (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            )
          })}
        </Tabs>
        <div style={{ padding: spacing(2), height: "95%", width: "95%" }}>
          {renderCurrentTab(currentTab)}
        </div>
      </div>
    </main>
  );
};

export default observer(DoctorProfile);