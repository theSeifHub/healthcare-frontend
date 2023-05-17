import React from "react";
import { observer } from "mobx-react-lite";
import { AppBar, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import theme from "../theme";
import stores from "../stores";
import NavBarLink from "./NavBarLink";

const pageRoutes = [
	{
		name: "Home",
		path: "/"
	},
	{
		name: "About Us",
		path: "/about-us"
	},
	{
		name: "Doctors",
		path: "/doctors"
	}
];

const NavBar = () => {
	const {
		palette: { primary, secondary, background },
		spacing
	} = theme;

	const navigate = useNavigate();

	const { authStore } = stores;

	return (
		<AppBar
			style={{
				background: background.default,
				position: "static",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between"
			}}
		>
			<nav>
				<ul
					style={{
						listStyleType: "none",
						margin: spacing(0),
						padding: spacing(1.5),
						display: "flex",
						alignItems: "center",
						gap: spacing(3)
					}}
				>
					<li>
						<img alt="logo" src={require("../assets/img/navbar-logo.png")} width={150} height={35} />
					</li>

					{pageRoutes.map((pr, index) => (
						<NavBarLink key={index} path={pr.path} label={pr.name} />
					))}

					{authStore.user && (
						<NavBarLink path={authStore.user.doctor ? "/doctor/services/land" : "/patient/services"} label="Services" />
					)}
				</ul>
			</nav>
			<div style={{ width: spacing(30), display: "flex", alignItems: "center", gap: spacing(2) }}>
				{authStore.user ? (
					<>
						<RouterLink to={"/profile"} style={{ textDecoration: "none", color: "black" }}>
							<AccountCircleIcon fontSize="large" />
						</RouterLink>

						<Button
							variant="contained"
							size="large"
							onClick={() => {
								authStore.logout();
								navigate("/sign-in");
							}}
							color="primary"
							style={{
								width: spacing(12),
								background: primary.main,
								padding: `${spacing(0.5)} ${spacing(1)}`
							}}
						>
							Sign Out
						</Button>
					</>
				) : (
					<>
						<RouterLink to={"/sign-up"} style={{ textDecoration: "none" }}>
							<Typography
								variant="button"
								color={secondary.contrastText}
								style={{
									background: secondary.main,
									padding: `${spacing(0.5)} ${spacing(1)}`
								}}
								fontSize={spacing(2.5)}
							>
								Sign Up
							</Typography>
						</RouterLink>
						<RouterLink to={"/sign-in"} style={{ textDecoration: "none" }}>
							<Typography
								variant="button"
								color={primary.contrastText}
								style={{
									background: primary.main,
									padding: `${spacing(0.5)} ${spacing(1)}`
								}}
								fontSize={spacing(2.5)}
							>
								Sign In
							</Typography>
						</RouterLink>
					</>
				)}
			</div>
		</AppBar>
	);
};

export default observer(NavBar);
