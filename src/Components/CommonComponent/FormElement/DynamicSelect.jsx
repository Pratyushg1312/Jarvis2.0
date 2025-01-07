import React from "react";
import { Autocomplete, FormGroup, TextField } from "@mui/material";

const DynamicSelect = ({
  data,
  value,
  onChange,
  label,
  required = false,
  placeholder = "Select",
  children,
}) => {
  const Wrapper = children ? FormGroup : "div";
  return (
    <Wrapper cclassName={children ? `form-group` : ""}>
      <Autocomplete
        aria-required={required}
        options={data}
        getOptionLabel={(option) => option}
        value={value || null}
        onChange={(event, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            placeholder={placeholder}
            {...params}
            label={label}
            variant="outlined"
            required={required}
            fullWidth
          />
        )}
        isOptionEqualToValue={(option, value) => option === value}
      />
    </Wrapper>
  );
};

export default DynamicSelect;
