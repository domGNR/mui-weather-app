import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { GEO_API_URL, geoDbOptions } from "../api";
import {saveQuery} from '../redux/reducers/api-forecast-reducer'

const MyAutocomplete = () => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const loadOptions = (inputValue) => {
    return fetch(`${GEO_API_URL}/cities?namePrefix=${inputValue}`, geoDbOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              // value: `${city.latitude} ${city.longitude}`,
              lat: `${Math.round(city.latitude)}`, 
              lon: `${Math.round(city.longitude)}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        if (query.trim() !== "") {
          const response = loadOptions(query);
          const printResponse = async () => {
            const result = await response;
            setOptions([...result.options]);
          };
          printResponse();
        }
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300,border: 'none transparent',
      outline: 'none' }} 
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => setOpen(false)}
      onChange={(event, value) => dispatch(saveQuery(value))}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ width: 300,border: 'none transparent',
            outline: 'none' }}  
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default MyAutocomplete;
