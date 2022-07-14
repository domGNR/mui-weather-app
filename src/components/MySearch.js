import {useState,useEffect} from 'react'
import {Paper,InputBase,Divider,IconButton} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// redux
import {
  fetchData as fetchForecastData,
} from "../redux/reducers/api-forecast-reducer";

import {
  fetchData as fetchCitiesData,
} from "../redux/reducers/api-cities-reducer";

import { useDispatch, useSelector } from "react-redux";

const MySearch = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState();
  
    const fetchByWord = (e) => {
      // e.preventDefault()
      // let path = `&q=${query}`;
      // dispatch(fetchForecastData(path));
      return
    };

    const fetchCities = (e) => {
      e.preventDefault()
      dispatch(fetchCitiesData())
    }

    useEffect(() => {
      // fetchCities()
    }, [])
    
  return (
    <Paper
      component="form"
      type='submit'
      onSubmit={fetchByWord}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={fetchByWord}>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
        type='text'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <IconButton type="submit"  aria-label="search"  onClick={fetchCities}>
        <LocationOnIcon />
      </IconButton>
    </Paper>
  );
}

export default MySearch
