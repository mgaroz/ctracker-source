import React, { useState, useEffect } from "react";
import { FormControl, TextField } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <FormControl className={styles.formControl} variant="outlined">
      <Autocomplete
        id="country-search"
        options={fetchedCountries}
        getOptionLabel={(country) => country}
        onChange={(e) => handleCountryChange(e.target.innerText)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            variant="outlined"
            placeholder="Global"
          />
        )}
      />
    </FormControl>
  );
};

export default CountryPicker;
