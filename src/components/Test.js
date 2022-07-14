import React, { useState } from "react";
import { AsyncPaginate, withAsyncPaginate,useComponents,useAsyncPaginate  } from "react-select-async-paginate";
import { geoDbOptions, GEO_API_URL } from "../api";
import {Container, Autocomplete, TextField,Select} from '@mui/material'
// import { withAsyncPaginate } from "react-select-async-paginate";



const Test = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
      geoDbOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };


  return (
    <Container sx={{marginTop:10}}>
        <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
    </Container>
  );
};

export default Test;
