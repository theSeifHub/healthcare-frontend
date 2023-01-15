import React from "react";
import { AppBar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import theme from "../theme";

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
		name: "Services",
		path: "/services"
	},
	{
		name: "Doctors",
		path: "/doctors"
	},
	{
		name: "Book",
		path: "/booking"
	}
];

const NavBar = () => {
	const {
		palette: { primary, secondary, background },
		spacing
	} = theme;

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
			<nav style={{ width: spacing(85) }}>
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
						<li key={index}>
							<RouterLink to={pr.path} style={{ textDecoration: "none" }}>
								<Typography variant="h6" color={primary.contrastText}>
									{pr.name}
								</Typography>
							</RouterLink>
						</li>
					))}
				</ul>
			</nav>
			<div style={{ width: spacing(23), display: "flex", alignItems: "center", gap: spacing(3) }}>
				<RouterLink to={"/sign-up"} style={{ textDecoration: "none" }}>
					<Typography
						variant="button"
						color={secondary.contrastText}
						style={{
							background: secondary.main,
							padding: `${spacing(0.5)} ${spacing(1)}`
						}}
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
					>
						Sign In
					</Typography>
				</RouterLink>
			</div>
		</AppBar>
	);
};

export default NavBar;
