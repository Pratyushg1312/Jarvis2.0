import React from "react";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalendarDots } from "@phosphor-icons/react";
import dayjs from "dayjs"; // Import Day.js for date handling

const FieldContainer = ({
  label,
  Tag = "input",
  type = "text",
  step = "any",
  rows,
  cols,
  value,
  onChange,
  onBlur,
  onKeyUp,
  required = true,
  disabled = false,
  children,
  fieldGrid = 6,
  multiple,
  placeholder,
  accept,
  max,
  maxLength,
  name,
  min,
  astric = false,
  refer,
  format = "DD/MM/YYYY", // Default format

}) => {

  const arrangeDate = (date, formatString = format) => {
    if (!date) return '';
    return dayjs(date).format(formatString);
  };

  const handleDateChange = (newValue) => {
    onChange(newValue ? arrangeDate(newValue, format) : ''); // Format selected date
  };

  return (
    <div
      className={
        Tag === "textarea"
          ? "col-xl-12 col-lg-12 col-md-12 col-sm-12"
          : `col-xl-${fieldGrid} col-lg-${fieldGrid} col-md-${fieldGrid} col-sm-12`
      }
    >
      {type === "date" ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={value ? dayjs(value) : null} // Ensure value is a Day.js object
            disabled={disabled}
            format={format}
            onChange={handleDateChange}
            slots={{
              openPickerIcon: CalendarDots, // Custom icon for the DatePicker
            }}
            renderInput={(params) => (
              <TextField {...params} required={required} fullWidth />
            )}
          />
        </LocalizationProvider>
      ) : (
        <TextField
          id={label}
          step={step}
          className={Tag === "select" ? "form-select" : "form-control"}
          type={type}
          value={value}
          rows={rows}
          cols={cols}
          onKeyUp={onKeyUp}
          onChange={onChange}
          required={required}
          disabled={disabled}
          multiple={multiple}
          accept={accept}
          placeholder={placeholder}
          max={max}
          maxLength={maxLength}
          name={name}
          min={min}
          onBlur={onBlur}
          ref={refer}
          variant="outlined"
          label={label}
        >
          {children}
        </TextField>
      )}
    </div>
  );
};

export default FieldContainer;
