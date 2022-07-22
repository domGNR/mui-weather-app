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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WiWindDeg } from "weather-icons-react";
import { saveDay } from "../redux/reducers/api-forecast-reducer";
import {degConversion,getIcon} from "../utils/helpers";

const DayWeather = () => {
  const dispatch = useDispatch();
  const {
    forecasts: { list },
    day:{selectedDay,today},
    deg,
  } = useSelector((state) => state.forecast);
  const timeElapsed = Date.now();
  const todayDt = new Date(timeElapsed);
  todayDt.setDate(selectedDay);
  const filtered = list
  .filter((el) => {
    return new Date(el.dt_txt).getDate() === todayDt.getDate();
  })
  // destructuring
  const { temp } = filtered[0].main;
  const { id, main, description } = filtered[0].weather[0];
  const { feels_like, humidity, temp_max, temp_min } = filtered[0].main;


  return (
    <>
      <Container>
        {selectedDay===today ? (
                  <Box>
                  <Typography variant="h3">Oggi</Typography>
                  <Paper sx={{ my: 2,  }} elevation={4}>
                    <Stack direction="row" py={2} justifyContent="space-around">
                      {/* side 1 */}
                      <Stack direction="column" spacing={1}>
                        <Typography variant="h3" fontWeight="bold">
                          {degConversion(deg, temp)}
                        </Typography>
                        <Typography variant="h4">
                          {main}
                          <Box
                            sx={{
                              px: "4px",
                              display: "inline-block",
                              position: "relative",
                              top: "15px",
                            }}
                          >
                            <img
                              src={getIcon(todayDt.getHours(), id)}
                              alt={description}
                            />
                          </Box>
                        </Typography>
                        <Box sx={{ pt: 1 }}>
                          <Typography variant="overline" sx={{ lineHeight: "inherit" }}>
                            {description}
                          </Typography>
                          <Typography variant="body1" sx={{ padding: 0, margin: 0 }}>
                            {todayDt.toDateString()} {todayDt.getHours()}:
                            {todayDt.getMinutes() < 10
                              ? "0" + todayDt.getMinutes().toFixed()
                              : todayDt.getMinutes().toFixed()}
                          </Typography>
                        </Box>
                      </Stack>
          
                      {/* side 2 */}
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Divider
                          variant="middle"
                          orientation="vertical"
                          sx={{ margin: "8px" }}
                        />
                        <Stack direction="column">
                          <Typography variant="subtitle1">
                            Real feel: {degConversion(deg, feels_like)}
                          </Typography>
                          <Typography variant="subtitle1">
                            Humidity: {humidity}%
                          </Typography>
                          <Typography variant="subtitle1">
                            Min Temp: {degConversion(deg, temp_min)}
                          </Typography>
                          <Typography variant="subtitle1">
                            Max Temp: {degConversion(deg, temp_max)}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Paper>
                  </Box>
        ):''}

      </Container>
      <Container sx={{ my: 5 }}>
        <Typography variant="h3">Intera giornata</Typography>
        <TableContainer component={Paper} elevation={4} sx={{ my: 2 }}>
          <Table size="small" aria-label="simple table">
            <TableBody>
              {filtered.map((el) => (
                  <TableRow
                    // key={el.h}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      dividerColor: {
                        backgroundColor: "red",
                      },
                      alignItems: "center",
                    }}
                  >
                    <TableCell>
                      {el.dt_txt.split(" ")[1].substring(0, 5)}
                    </TableCell>
                    <TableCell>
                      <img
                        style={{ padding: 0, width: "35px", height: "35px" }}
                        src={getIcon(
                          parseInt(el.dt_txt.split(" ")[1].substring(0, 2)),
                          id
                        )}
                        alt="description"
                      />
                    </TableCell>
                    <TableCell align="right">
                      {degConversion(deg, el.main.temp)}
                    </TableCell>
                    <TableCell align="right">
                      {el.wind.speed}
                      {" m/s"}
                      <Box
                        sx={{
                          display: "inline-block",
                          position: "relative",
                          top: "4px",
                        }}
                      >
                        <WiWindDeg size={20} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default DayWeather;
