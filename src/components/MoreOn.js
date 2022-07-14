import {
  Typography,
  Box,
  Stack,
  Container,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { WiCloudy, WiDayThunderstorm } from "weather-icons-react";
import { useState } from "react";

function createData(h, weather, deg, wind) {
  return { h, weather, deg, wind };
}

const rows = [
  createData('2:00', <WiCloudy size={30}/>, '24°', '12 m/s'),
  createData('2:00', <WiCloudy size={30}/>, '24°', '12 m/s'),
  createData('2:00', <WiCloudy size={30}/>, '24°', '12 m/s'),
  createData('2:00', <WiCloudy size={30}/>, '24°', '12 m/s'),
  createData('2:00', <WiCloudy size={30}/>, '24°', '12 m/s'),
  createData('2:00', <WiCloudy size={30}/>, '24°', '12 m/s'),
];

const MoreOn = () => {
  return (
    <Container sx={{my:5}}>
      <Typography variant="h3">More on</Typography>
      <TableContainer component={Paper} elevation={4} sx={{my:2}} >
        <Table size='small' aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.h}
                sx={{ "&:last-child td, &:last-child th": { border: 0 },dividerColor: {
                  backgroundColor: 'red',
                }, }}
              >
                <TableCell>{row.h}</TableCell>
                <TableCell>{row.weather}</TableCell>
                <TableCell>{row.deg}</TableCell>
                <TableCell>{row.wind}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MoreOn;
