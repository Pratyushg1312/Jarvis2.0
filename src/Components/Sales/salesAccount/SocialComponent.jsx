import React from "react";
import Select from "react-select";
import FieldContainer from "../../CommonComponent/FormElement/FieldContainer";
import DynamicSelect from "../../CommonComponent/FormElement/DynamicSelect";
import { Button } from "@mui/material";
import { Plus, Trash } from "@phosphor-icons/react";

const SocialComponent = ({
  fields,
  handlePlatformChange,
  handleLinkChange,
  getAvailableOptions,
  handleDelete,
}) => {
  return (
    <>
      {fields.map((field, index) => (
        <div key={index} className="row">
          <div className="col">
            <DynamicSelect
              label={"Select Social"}
              data={getAvailableOptions(index).map((option) => (option.label))}
              value={field.platform?.label}
              onChange={(selectedOption) =>
                handlePlatformChange(index, getAvailableOptions(index).find((option) => option?.label === selectedOption))
              }
              placeholder="Select a platform"

            />
            {/* <Select
              value={field.platform}
              onChange={(selectedOption) =>
                handlePlatformChange(index, selectedOption)
              }
              options={getAvailableOptions(index)}
              placeholder="Select a platform"
            /> */}
          </div>
          <div className="col">
            <FieldContainer
              label="Link"
              fieldGrid={12}
              type="text"
              value={field.link}
              onChange={(event) => handleLinkChange(index, event)}
              placeholder="Enter link"
            />
          </div>
          <div className="w-auto pt25">
            <Button className="iconBtn mt24" onClick={() => handleDelete(index)}>
              <Trash />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SocialComponent;
