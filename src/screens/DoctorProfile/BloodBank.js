import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import theme from "../../theme";
import stores from "../../stores";
import Spinner from "../../components/Spinner";
import { bloodTypes } from "../../constants";

const BloodBank = () => {
  const { spacing } = theme;

  const [loadingData, setLoadingData] = useState(true);

  const [bloodType, setBloodType] = useState("A+");

  const [bagsInStock, setBagsInStock] = useState(0);
  const [fetchingBags, setFetchingBags] = useState(false);
  const [requestedBags, setRequestedBags] = useState(0);
  const [requestedBagsError, setRequestedBagsError] = useState("");

  const [attemptingSubmit, setAttemptingSubmit] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  useEffect(() => {
    setFetchingBags(true);
    stores.doctorServicesStore
      .getBloodTypeAmount(bloodType)
      .then(res => setBagsInStock(res.amount_in_bags || 0))
      .catch(err => console.error("Blood bank error", err))
      .finally(() => {
        setFetchingBags(false);
        setLoadingData(false);
      });
  }, [bloodType, successfulSubmission]);

  if (loadingData) {
    return <Spinner size="large" />
  }

  const handleRequest = async () => {
    if (requestedBags <= 0) {
      setRequestedBagsError('Number of bags is required');
    } else if (bagsInStock && requestedBags > bagsInStock) {
      setRequestedBagsError(`Maximum ${bagsInStock} bags`);
    } else if (bloodType && bagsInStock && requestedBags > 0 && requestedBags <= bagsInStock) {
      setAttemptingSubmit(true);
      setRequestedBagsError('');
      const newBBRequest = {
        blood_type: bloodType,
        amount: requestedBags,
      };

      try {
        await stores.doctorServicesStore.createBloodBankBagRequest(newBBRequest);
        setSuccessfulSubmission(true);
        setTimeout(() => setSuccessfulSubmission(false), 1000);
      } catch (error) {
        console.error("BloodBank error:", error);
      } finally {
        setAttemptingSubmit(false);
      }
    }
  };

  return (
    <div style={{
      marginTop: spacing(2),
      padding: spacing(2),
      display: "flex",
      flexDirection: "column",
      gap: spacing(3),
    }}>
      <FormControl style={{
        width: spacing(75),
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing(2),
        padding: spacing(2),
        border: "gray solid 0.5px",
        borderRadius: spacing(1),
      }}>
        <FormLabel style={{
          width: spacing(30),
          height: spacing(3),
        }}>Current Blood Bags Amount</FormLabel>

        <Select
          value={bloodType}
          displayEmpty
          defaultValue='none'
          onChange={(evt) => setBloodType(evt.target.value)}
          style={{ width: spacing(15) }}
        >
          <MenuItem value='none' disabled>Blood Type</MenuItem>
          {bloodTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>

        <Typography
          fontWeight="700"
          textAlign="center"
          style={{ width: spacing(15), height: spacing(4) }}
          component="div"
        >{fetchingBags ? <Spinner size="xsmall" /> : `${bagsInStock} bags`}</Typography>
      </FormControl>

      <Box style={{
        width: spacing(75),
        display: 'flex',
        flexDirection: "column",
        gap: spacing(1),
        border: "gray solid 0.5px",
        borderRadius: spacing(1),
        padding: spacing(2),
      }}>
        <FormControl style={{
          width: "100%",
          display: 'flex',
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing(2),
        }}>
          <FormLabel style={{
            width: spacing(30),
            height: spacing(3),
          }}>Request Bags</FormLabel>
          <TextField
            type="number"
            value={requestedBags}
            onChange={(evt) => {
              evt.preventDefault();
              if (evt.currentTarget.value >= 0) {
                setRequestedBags(Number(evt.currentTarget.value))
              }
            }}
            variant="outlined"
            style={{ width: spacing(15) }}
            disabled={bagsInStock === 0}
            error={!!requestedBagsError}
          />
          {successfulSubmission ? (
            <Typography
              color="green"
              style={{
                border: "green solid 0.5px",
                borderRadius: spacing(1),
                textAlign: "center",
                padding: spacing(2),
              }}
            >Request Sent</Typography>
          ) : (
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleRequest}
              disabled={bagsInStock === 0 || attemptingSubmit}
              style={{ width: spacing(16), borderRadius: spacing(1) }}
            >{attemptingSubmit ? "Sending ..." : "Request"}</Button>
          )}
        </FormControl>
        <FormHelperText error style={{ textAlign: "center" }}>
          {requestedBagsError}
        </FormHelperText>
      </Box>
    </div>
  );
};

export default observer(BloodBank);