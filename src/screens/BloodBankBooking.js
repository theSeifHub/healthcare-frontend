import React, { useState } from "react";
import {
  Paper,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import theme from "../theme";
import stores from "../stores";
import { useNavigate } from "react-router-dom";
import { bloodTypes } from "../constants";
import { SubmitSuccess } from "../components/SubmitSuccess";

const BloodBankBooking = () => {
  const { spacing } = theme;
  const navigate = useNavigate();

  const [bloodType, setBloodType] = useState("");
  const [bloodTypeError, setBloodTypeError] = useState('');
  const [noOfBags, setNoOfBags] = useState(0);
  const [noOfBagsError, setNoOfBagsError] = useState('');

  const [attemptingSubmit, setAttemptingSubmit] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const handleSubmit = async () => {
    setAttemptingSubmit(true);
    setBloodTypeError(bloodType ? '' : 'Blood type is required');
    setNoOfBagsError(noOfBags > 0 ? '' : 'No of bags is required');

    if (bloodType && noOfBags > 0) {
      const newService = {
        blood_type: bloodType,
        amount: noOfBags,
      };
      const res = await stores.doctorServicesStore.createNewBloodBankService(newService);

      if (res) {
        setSuccessfulSubmission(true);
        setTimeout(
          () => navigate("/doctor/services"),
          2000,
        )
      }
    }
    setAttemptingSubmit(false);
  };

  return (
    <section style={{
      display: "flex",
      justifyContent: "space-between",
      padding: spacing(3),
    }}>
      <div style={{ margin: spacing(3) }}>
        <Paper elevation={0} style={{
          width: spacing(60),
          display: 'flex',
          flexDirection: "column",
          gap: spacing(3),
          marginLeft: spacing(15),
        }}>

          <Typography variant="h4">Blood Bank</Typography>
          {successfulSubmission ? (<SubmitSuccess />) : (
            <>
              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(16) }}>
                  Blood Type:
                </FormLabel>
                <Select
                  value={bloodType}
                  displayEmpty
                  defaultValue='none'
                  onChange={(evt) => setBloodType(evt.target.value)}
                  error={!!bloodTypeError}
                  style={{ width: spacing(45) }}
                >
                  <MenuItem value='none' disabled>Blood Type</MenuItem>
                  {bloodTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {bloodTypeError}
                </FormHelperText>
              </FormControl>

              <FormControl style={{
                width: spacing(60),
                display: 'flex',
                justifyContent: "space-between",
                gap: spacing(2),
              }}>
                <FormLabel style={{ width: spacing(16) }}>
                  No Of Bags:
                </FormLabel>
                <TextField
                  type="number"
                  min=""
                  value={noOfBags}
                  onChange={(evt) => {
                    if (evt.currentTarget.value >= 0) {
                      setNoOfBags(evt.currentTarget.value)
                    }
                  }}
                  variant="outlined"
                  style={{ width: spacing(45) }}
                  error={!!noOfBagsError}
                />
                <FormHelperText error>{noOfBagsError}</FormHelperText>
              </FormControl>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSubmit}
                disabled={attemptingSubmit}
                style={{
                  width: spacing(20),
                  borderRadius: spacing(2),
                  alignSelf: "flex-end",
                }}
              >
                {attemptingSubmit ? "Submitting ..." : "Submit"}
              </Button>
            </>
          )}
        </Paper>
      </div>

      <img
        alt='doctor writing prescription'
        src={require('../assets/img/doctor-services/blood-bank-hero.png')}
        width={spacing(70)} height={spacing(55)}
      />

    </section >
  );
};

export default BloodBankBooking;
