import React from "react";

const Spinner = ({ size, color = "#383636" }) => {
	const spinnerStyles = `
    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

	const getSize = () => {
		switch (size) {
			case "large":
				return "50px";
			case "small":
				return "30px";
			case "medium":
			default:
				return "40px";
		}
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<style>{spinnerStyles}</style>

			<div>
				<div
					style={{
						width: getSize(),
						height: getSize(),
						border: "10px solid #f3f3f3" /* Light grey */,
						borderTop: `10px solid ${color}` /* Black */,
						borderRadius: "50%",
						animation: "spinner 1.5s linear infinite"
					}}
				/>
			</div>
		</div>
	);
};
export default Spinner;
