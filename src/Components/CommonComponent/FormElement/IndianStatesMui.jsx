import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { State } from "country-state-city";
import { ClassNames } from "@emotion/react";

const IndianStatesMui = ({ selectedState, onChange, fieldGrid = "12", label, required = false }) => {
  const states = State.getStatesOfCountry("IN"); // Array of state objects
  const [inputValue, setInputValue] = useState("");

  // Function to find the state object by isoCode
  const findStateByIsoCode = (isoCode) => {
    return states.find((state) => state.isoCode === isoCode) || null;
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <div className={`col-md-${fieldGrid}`} >

      <Autocomplete
        options={states}
        getOptionLabel={(option) => option.name} // Display the name in the dropdown
        value={findStateByIsoCode(selectedState)} // Find the state object based on the isoCode
        onChange={(event, newValue) => onChange(newValue ? newValue.isoCode : "")} // Pass the isoCode to the onChange handler
        inputValue={inputValue}
        onInputChange={handleInputChange}
        isOptionEqualToValue={(option, value) => option.isoCode === value.isoCode} // Compare based on isoCode
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" required={required} />
        )}
        clearOnEscape
      />
    </div>
  );
};

export default IndianStatesMui;
