import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../theme";

const NavBarLink = ({ path, label }) => {
	const {
		palette: { primary }
	} = theme;
	return (
		<li>
			<Link to={path} style={{ textDecoration: "none" }}>
				<Typography variant="h6" color={primary.contrastText}>
					{label}
				</Typography>
			</Link>
		</li>
	);
};

export default NavBarLink;
