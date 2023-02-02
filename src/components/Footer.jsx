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
			<FacebookIcon
				fontSize="large"
				color="primary"
				sx={{
					borderRadius: 1.5,
					"&:hover": {
						background: "#fff",
						color: "#3b5998"
					}
				}}
			/>
			<InstagramIcon
				fontSize="large"
				color="primary"
				sx={{
					borderRadius: 3,
					"&:hover": {
						background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
						color: "#fff"
					}
				}}
			/>
			<TwitterIcon
				fontSize="large"
				color="primary"
				sx={{
					borderRadius: 6,
					"&:hover": {
						background: "#fff",
						color: "#00acee"
					}
				}}
			/>
			<PinterestIcon
				fontSize="large"
				color="primary"
				sx={{
					borderRadius: 6,
					"&:hover": {
						background: "#fff",
						color: "#c8232c"
					}
				}}
			/>
			<YouTubeIcon
				fontSize="large"
				color="primary"
				sx={{
					padding: 0,
					margin: 0,
					borderRadius: 2,
					"&:hover": {
						background: "#fff",
						color: "#c4302b"
					}
				}}
			/>
		</footer>
	);
};

export default Footer;
