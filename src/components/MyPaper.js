import {
  Paper,
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Checkbox,
  Menu,
  Select,
  MenuItem,
} from "@mui/material";
import MySearch from "./MySearch";
import MyNavbar from "./MyNavbar";
import DayWeather from "./DayWeather";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Star from "@mui/icons-material/Star";
import { saveDeg, toggleFav } from "../redux/reducers/api-forecast-reducer";
import { getItemFromLocalStorage, setLocalStorageItem } from "../utils/helpers";
import { fetchData as fetchForecastData } from "../redux/reducers/api-forecast-reducer";

const MyPaper = () => {
  const dispatch = useDispatch();
  const {
    query: { query },
    deg,
    forecasts,
    forecasts: { cod },
  } = useSelector((state) => state.forecast);

  const [label, setLabel] = useState();

  const favs = getItemFromLocalStorage("fav-list");

  const handleChange = (e, newDegree) => {
    if (newDegree !== null) {
      dispatch(saveDeg(newDegree));
      setLocalStorageItem("last-degree", newDegree);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (e,el) => {
    dispatch(fetchForecastData(`&lat=${e.lat}&lon=${e.lon}`))
  }

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
                    sx={{ border: "#1px solid rgba(23, 96, 165, 0.5)" }}
                    color="primary"
                    size="small"
                    value={localStorage.getItem("last-degree") || deg}
                    exclusive
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <ToggleButton
                      value="K"
                      sx={{ border: "1px solid rgba(23, 96, 165, 0.5)" }}
                    >
                      K°
                    </ToggleButton>
                    <ToggleButton
                      value="C"
                      sx={{ border: "1px solid rgba(23, 96, 165, 0.5)" }}
                    >
                      C°
                    </ToggleButton>
                    <ToggleButton
                      value="F"
                      sx={{ border: "1px solid rgba(23, 96, 165, 0.5)" }}
                    >
                      F°
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={handleClick}
                    component="div"
                    startIcon={
                      <IconButton
                        disabled={cod === "200" ? false : true}
                        onClick={() => {
                          dispatch(
                            toggleFav({
                              id: forecasts?.city?.id,
                              name:
                                forecasts?.city?.name +
                                "," +
                                forecasts?.city?.country,
                              lat: forecasts?.city?.coord?.lat,
                              lon: forecasts?.city?.coord?.lon,
                            })
                          );
                        }}
                        aria-label="add to favorites"
                        sx={{ padding: 0 }}
                      >
                        <Checkbox
                          sx={{ p: 0 }}
                          size="small"
                          icon={
                            <Star
                              sx={{
                                stroke: "#1760a5",
                                strokeWidth: "1px",
                                fill: "transparent",
                              }}
                            />
                          }
                          checkedIcon={<Star />}
                        />
                      </IconButton>
                    }
                  >
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {favs.map((el) => {
                        return (
                          <MenuItem onClick={()=>handleItemClick(el)} key={el.id}>
                            {el.name}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                    {label || "Preferiti"}
                  </Button>
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
                <DayWeather />
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
