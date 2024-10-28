import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const CustomSelect = ({
  fieldGrid = 4,
  label,
  dataArray,
  optionId,
  optionLabel,
  selectedId,
  setSelectedId,
  required,
  disabled,
  multiple = false,
  filterOption
}) => {
  const findOptionLabelById = (id) =>
    dataArray?.find((option) => option[optionId] === id)?.[optionLabel];

  const selectAllOption = {
    [optionId]: "selectAll",
    [optionLabel]: "Select All",
  };

  const isAllSelected = dataArray?.length === selectedId?.length;

  const valueProp = multiple
    ? selectedId?.map((id) => dataArray?.find((option) => option[optionId] === id))
    : dataArray?.find((option) => option[optionId] === selectedId) || null;

  const handleChange = (event, selectedOptions) => {
    if (multiple) {
      const allSelected = selectedOptions.some(
        (option) => option[optionId] === selectAllOption[optionId]
      );

      if (allSelected) {
        setSelectedId(isAllSelected ? [] : dataArray?.map((option) => option[optionId]));
      } else {
        setSelectedId(selectedOptions.map((option) => option[optionId]));
      }
    } else {
      setSelectedId(selectedOptions ? selectedOptions[optionId] : null);
    }
  };

  const options = multiple ? [selectAllOption, ...dataArray] : dataArray;

  return (
    <div className={`form-group col-${fieldGrid}`}>

      <Autocomplete
        multiple={multiple}
        disableCloseOnSelect={multiple}
        options={options}
        value={valueProp}
        onChange={handleChange}
        getOptionLabel={(option) => option[optionLabel]}
        isOptionEqualToValue={(option, value) => option[optionId] === value[optionId]}
        disabled={disabled}
        filterOptions={filterOption ? filterOption : undefined}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required={required}
            placeholder={`Search ${label}...`}
            variant="outlined"
          />
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            {multiple && (
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={selected || (option[optionId] === selectAllOption[optionId] && isAllSelected)}
              />
            )}
            {option[optionLabel]}
          </li>
        )}
      />
    </div>
  );
};

export default CustomSelect;
