import React from "react";
import Select from "react-select";
import FieldContainer from "../../CommonComponent/FormElement/FieldContainer";
import DynamicSelect from "../../CommonComponent/FormElement/DynamicSelect";

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
        <div key={index} className="d-flex">
          <div className="col-4">
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
          <div className="col-4">
            <FieldContainer
              label="Link"
              fieldGrid={12}
              type="text"
              value={field.link}
              onChange={(event) => handleLinkChange(index, event)}
              placeholder="Enter link"
            />
          </div>
          <button
            type="button"
            className="btn cmnbtn btn-primary mt-4"
            onClick={() => handleDelete(index)}
          >
            <i className="bi bi-trash" />
          </button>
        </div>
      ))}
    </>
  );
};

export default SocialComponent;
