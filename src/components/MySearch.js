import { useState, useEffect } from "react";
import {
  Paper,
  InputBase,
  Select,
  Autocomplete,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyAutocomplete from "./MyAutocomplete";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import {saveQuery} from '../redux/reducers/api-forecast-reducer'

// redux
import { fetchData as fetchForecastData } from "../redux/reducers/api-forecast-reducer";
import { useDispatch, useSelector } from "react-redux";


const MySearch = () => {
  const {query:{query}} = useSelector((state) => state.forecast)
  const {forecasts} = useSelector((state) => state.forecast)

  const dispatch = useDispatch();

  const fetchByCoords = (e) => {
      e.preventDefault()
    if(query.lat || query.lon){
      let path = `&lat=${query.lat}&lon=${query.lon}`
      dispatch(fetchForecastData(path))
    }
    else alert('Inserire una città o geolocalizzarsi')
  };
  
 const success =  (pos) => {
  const value = {lat:Math.round(pos.coords.latitude),lon:Math.round(pos.coords.longitude)} 
  dispatch(saveQuery(value))
  dispatch(fetchForecastData(`&lat=${value.lat}&lon=${value.lon}`))
  return value
 }


  return (
    <>
      <Paper
        component="form"
        // type="submit"
        // onSubmit={fetchByCoords}
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu" onClick={fetchByCoords}>
          <SearchIcon />
        </IconButton>
      <MyAutocomplete />
        <IconButton aria-label="search" onClick={() =>  {
          navigator.geolocation.getCurrentPosition(success)}}>
          <GpsFixedIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default MySearch;
