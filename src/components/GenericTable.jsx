import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const GenericTable = ({ headers, rows }) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						{headers.map((header, i) => (
							<TableCell key={i}>{header.title}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, i) => (
						<TableRow key={i}>
							{headers.map((header, l) => (
								<TableCell key={l}>{row[header.id]}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default GenericTable;
