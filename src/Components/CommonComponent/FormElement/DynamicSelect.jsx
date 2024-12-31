import React from 'react'
import { Autocomplete, TextField } from "@mui/material";

const DynamicSelect = ({ data, value, onChange, cols, label, required = false, placeholder = "Select" }) => {
    return (
        <div className={`form-group col-${cols}`}>

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
        </div>
    );
}

export default DynamicSelect