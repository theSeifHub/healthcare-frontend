import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalHospital from "@mui/icons-material/LocalHospital";
import CreditCard from "@mui/icons-material/CreditCard";
import theme from "../theme";
import stores from "../stores";

const DoctorCard = ({ doctorData, speciality, canBook }) => {
	const navigate = useNavigate();
	const {
		spacing,
		palette: { background, secondary }
	} = theme;

	return (
		<Paper
			style={{
				width: spacing(35),
				background: background.default,
				display: "flex",
				flexDirection: "column",
				border: `${spacing(1)} solid #fff`,
				padding: spacing(2),
				gap: spacing(2)
			}}
			elevation={5}
		>
			<img
				alt="doctor icon"
				src={require("../assets/img/doctor.png")}
				width={spacing(28)}
				height={spacing(28)}
				style={{ marginTop: spacing(1), alignSelf: "center" }}
			/>
			<Typography variant="h5" textAlign="center">
				{`${doctorData.first_name} ${doctorData.last_name}`}
			</Typography>
			<div style={{ display: "flex" }}>
				<LocalHospital />
				<Typography style={{ marginLeft: spacing(2) }}>{speciality.name}</Typography>
			</div>
			<div style={{ display: "flex" }}>
				<CreditCard />
				<Typography style={{ marginLeft: spacing(2) }}>{doctorData.association_number}</Typography>
			</div>
			{!!stores.authStore.user.patient && canBook && (
				<Button
					variant="contained"
					size="large"
					onClick={() => navigate(`/booking?doctor=${doctorData.id}`)}
					color="secondary"
					style={{
						width: spacing(15),
						background: secondary.main,
						padding: `${spacing(0.5)} ${spacing(1)}`,
						alignSelf: "center"
					}}
				>
					Book Now
				</Button>
			)}
		</Paper>
	);
};

export default DoctorCard;
