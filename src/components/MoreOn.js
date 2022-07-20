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
import { WiCloudy, WiDayThunderstorm,WiWindDeg } from "weather-icons-react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import degConversion from '../utils/degConversion'
import getIcon from '../utils/getIcon'

const MoreOn = () => {
  const {forecasts:{list,city},deg} = useSelector((state) => state.forecast)
    // createData('2:00', <WiCloudy size={30}/>, '24°', '12 m/s'),
  const msToDate = (date) => {
    const res = new Date(date)
    return res
  }
  return (
    <Container sx={{my:5}}>
      <Typography variant="h3">More on</Typography>
      <TableContainer component={Paper} elevation={4} sx={{my:2}} >
        <Table size='small' aria-label="simple table">
          <TableBody>
          {list.slice(0,5).map((el) => (
              <TableRow
                // key={el.h}
                sx={{ "&:last-child td, &:last-child th": { border: 0 },dividerColor: {
                  backgroundColor: 'red',
                },alignItems:'center' }}
              >
                <TableCell>{el.dt_txt.split(' ')[1].substring(0,5)}</TableCell>
                <TableCell><img style={{padding:0}} src={
getIcon(parseInt(el.dt_txt.split(' ')[1].substring(0,2)),list[0].weather[0].id)
                } alt='description'/></TableCell>
                <TableCell>{degConversion(deg,el.main.temp)}</TableCell>
                <TableCell>{el.wind.speed} <Box sx={{display:'inline-block',position:'relative',top:'4px'}}><WiWindDeg size={20}/></Box></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MoreOn;
