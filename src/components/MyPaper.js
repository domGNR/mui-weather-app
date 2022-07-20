import {
  Paper,
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import MySearch from "./MySearch";
import MyNavbar from "./MyNavbar";
import Today from "./Today";
import { useState, useEffect } from "react";
import MoreOn from "./MoreOn";
import { useDispatch, useSelector } from "react-redux";
import {saveDeg} from '../redux/reducers/api-forecast-reducer'


const MyPaper = () => {
  const dispatch = useDispatch()
  const {deg} = useSelector((state) => state.forecast)
  const [label, setLabel] = useState();

  const handleChange = (e,newDegree) => {
    if(newDegree!==null){
    dispatch(saveDeg(newDegree))
    localStorage.setItem('last-degree', newDegree) 
  }
  }
  const {
    query: { query },
    forecasts,
  } = useSelector((state) => state.forecast);

  useEffect(() => {
    if (forecasts?.city?.name !== undefined) {
      setLabel(forecasts?.city?.name + ", " + forecasts?.city?.country);
    } else return;
  }, [forecasts]);

  return (
    <Container>
      <Paper elevation={0} sx={{ marginTop: "50px", marginBottom: "50px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ backgroundColor: "#ddd", borderRadius: "5%" }}
        >
          {/* SIDE 1 */}
          <Box
            sx={{
              backgroundColor: "skyblue",
              borderRadius: "5%",
              flex: 1,
              minHeight: 700,
            }}
          >
            <Container>
              <Stack mt={2} justifyContent="space-between" direction="row">
                <Box>
                  <ToggleButtonGroup
                    sx={{border:'#1px solid rgba(23, 96, 165, 0.5)'}}
                    color="primary"
                    size="small"
                    value={localStorage.getItem('last-degree') || deg}
                    exclusive
                    onChange={handleChange}
                    variant='outlined'
                  >
                    <ToggleButton value="K" sx={{border:'1px solid rgba(23, 96, 165, 0.5)'}}>K°</ToggleButton>
                    <ToggleButton value="C" sx={{border:'1px solid rgba(23, 96, 165, 0.5)'}}>C°</ToggleButton>
                    <ToggleButton value="F" sx={{border:'1px solid rgba(23, 96, 165, 0.5)'}}>F°</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Box>
                  <Button variant="outlined">{label || "city"}</Button>
                </Box>
              </Stack>
              <Box
                sx={{
                  height: 700,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  The Only weather Forecast You Need
                </Typography>
                <Divider sx={{ width: "60%" }} />
                <MySearch />
              </Box>
            </Container>
          </Box>

          {/* SIDE 2 */}
          <Box
            sx={{
              backgroundColor: "#ddd",
              borderTopRightRadius: "5%",
              borderBottomRightRadius: "5%",
              flex: 1,
              minHeight: 600,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Container>
              <MyNavbar />
            </Container>
            {forecasts?.cod === "200" ? (
              <>
                <Today />
                <MoreOn />
              </>
            ) : (
              <Container sx={{ m: 5 }}>
                <Typography variant="h3">No data yet</Typography>{" "}
              </Container>
            )}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default MyPaper;
