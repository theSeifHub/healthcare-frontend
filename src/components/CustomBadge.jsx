import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const CustomBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		width: theme.spacing(3.5),
		height: theme.spacing(3.5),
		borderRadius: theme.spacing(3.5),
		right: 25,
		top: 170,
		border: `5px solid ${theme.palette.background.paper}`,
		boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
	}
}));

export default CustomBadge;
