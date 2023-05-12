import React from "react";
import { Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import theme from "../theme";

export const SubmitSuccess = () => {
	const { spacing } = theme;

	return (
		<>
			<Typography variant="h5" fontWeight="700" style={{ color: "green", marginTop: spacing(3) }}>
				Submitted Successfully
			</Typography>
			<CheckCircleOutlineIcon
				color="success"
				style={{
					width: spacing(20),
					height: spacing(20)
				}}
			/>
		</>
	);
};
