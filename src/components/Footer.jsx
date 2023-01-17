import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";

import theme from "../theme";

const Footer = () => {
	const {
		palette: { secondary },
		spacing
	} = theme;

	return (
		<footer
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: spacing(5),
				background: secondary.main,
				height: spacing(7.5)
			}}
		>
			<FacebookIcon fontSize="large" color="primary" />
			<InstagramIcon fontSize="large" color="primary" />
			<TwitterIcon fontSize="large" color="primary" />
			<PinterestIcon fontSize="large" color="primary" />
			<YouTubeIcon fontSize="large" color="primary" />
		</footer>
	);
};

export default Footer;
