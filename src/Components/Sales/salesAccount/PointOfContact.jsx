import React from "react";
import Select from "react-select";
import FieldContainer from "../../CommonComponent/FormElement/FieldContainer";
import DynamicSelect from "../../CommonComponent/FormElement/DynamicSelect";
import CustomSelect from "../../CommonComponent/FormElement/CustomSelect";
import { Button } from "@mui/material";
import { Eye, Plus, Trash } from "@phosphor-icons/react";

const PointOfContact = ({
  pocs,
  setPocs,
  isValidPoc,
  setIsValIDPoc,
  openModal,
  departments,
  socialOptions,
}) => {
  const handlePocChange = (index, key, value) => {
    const updatedPocs = pocs?.map((poc, pocIndex) =>
      pocIndex === index ? { ...poc, [key]: value } : poc
    );
    setPocs(updatedPocs);
  };

  const handleDeletePoc = (index) => {
    const updatedPocs = [...pocs];
    updatedPocs.splice(index, 1);
    setPocs(updatedPocs);
  };

  function isValidContactNumber(number) {
    if (!number) return true;
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  }

  function isValidEmail(email) {
    if (!email) return true;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const handleAddSocialLink = (index) => {
    const updatedPocs = pocs.map((poc, pocIndex) =>
      pocIndex === index
        ? {
            ...poc,
            social_platforms: [
              ...(poc.social_platforms || []),
              { platform: null, link: "" },
            ],
          }
        : poc
    );
    setPocs(updatedPocs);
  };

  const handleSocialLinkChange = (pocIndex, linkIndex, key, value) => {
    const updatedPocs = pocs.map((poc, index) =>
      index === pocIndex
        ? {
            ...poc,
            social_platforms: poc.social_platforms.map((link, i) =>
              i === linkIndex ? { ...link, [key]: value } : link
            ),
          }
        : poc
    );

    setPocs(updatedPocs);
  };

  const handleDeleteSocialLink = (pocIndex, linkIndex) => {
    const updatedPocs = pocs.map((poc, index) =>
      index === pocIndex
        ? {
            ...poc,
            social_platforms: poc.social_platforms.filter(
              (_, i) => i !== linkIndex
            ),
          }
        : poc
    );
    setPocs(updatedPocs);
  };

  const getAvailableOptions = (pocIndex, linkIndex) => {
    const selectedValues = pocs[pocIndex]?.social_platforms
      ?.map((link) => link.platform)
      .filter(Boolean);

    // Ensure the selected value is in the format { value: 'value', label: 'label' }
    return socialOptions.filter(
      (option) =>
        !selectedValues.includes(option.value) ||
        pocs[pocIndex]?.social_platforms[linkIndex]?.platform?.value ===
          option.value
    );
  };

  return (
    <>
      {pocs?.map((poc, index) => (
        <div className="card" key={"aslnkh" + index}>
          <div className="card-header">
            <div className="cardHeading">
              <h5 className="cardTitle">Point of Contact ({index + 1})</h5>
            </div>
            <div className="cardAction">
              <Button
                className="iconBtn"
                onClick={() => handleDeletePoc(index)}
              >
                <Trash />
              </Button>
            </div>
          </div>
          <div className="card-body">
            <div key={index} className="row poc-container">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  astric
                  label="Contact Name"
                  value={poc.contact_name}
                  onChange={(e) => {
                    handlePocChange(index, "contact_name", e.target.value);
                    setIsValIDPoc({
                      ...isValidPoc,
                      [index]: {
                        ...isValidPoc[index],
                        contact_name: e.target.value,
                      },
                    });
                  }}
                  placeholder="Enter contact name"
                  required
                />
                {isValidPoc[index]?.contact_name === "" && (
                  <div className="form-error">Please Enter Contact Name</div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  astric
                  label="Contact Number"
                  type="number"
                  value={poc.contact_no}
                  onChange={(e) => {
                    handlePocChange(index, "contact_no", e.target.value);
                    setIsValIDPoc({
                      ...isValidPoc,
                      [index]: {
                        ...isValidPoc[index],
                        contact_no: e.target.value,
                      },
                    });
                  }}
                  placeholder="Enter contact number"
                  required
                />
                {!isValidContactNumber(poc.contact_no) && (
                  <div className="form-error">
                    Please Enter Valid Contact Number
                  </div>
                )}
                {isValidPoc[index]?.contact_no === "" && (
                  <div className="form-error">Please Enter Contact Number</div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  required={false}
                  label="Alternative Contact Number"
                  type="number"
                  value={poc.alternative_contact_no}
                  onChange={(e) => {
                    handlePocChange(
                      index,
                      "alternative_contact_no",
                      e.target.value
                    );
                  }}
                  placeholder="Enter alternative contact number"
                />
                {!isValidContactNumber(poc.alternative_contact_no) && (
                  <div className="form-error">
                    Please Enter Valid Alternate Contact Number
                  </div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  required={false}
                  label="Email"
                  type="email"
                  value={poc.email}
                  onChange={(e) => {
                    handlePocChange(index, "email", e.target.value);
                  }}
                  placeholder="Enter email"
                />

                {!isValidEmail(poc.email) && (
                  <div className="form-error">Please Enter Valid Email</div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <CustomSelect
                  required={true}
                  label={"Select Department"}
                  dataArray={departments}
                  optionId={"_id"}
                  optionLabel={"department_name"}
                  selectedId={poc["department"]}
                  setSelectedId={(value) => {
                    handlePocChange(index, "department", value);
                  }}
                >
                  <>
                    <Button
                      type="button"
                      className="icon"
                      onClick={() => openModal("addDepartment")}
                    >
                      <Plus />
                    </Button>
                    <Button
                      type="button"
                      className="icon"
                      onClick={() => openModal("viewDepartment")}
                    >
                      <Eye />
                    </Button>
                  </>
                </CustomSelect>
                {isValidPoc[index]?.department === "" && (
                  <div className="form-error">Please Enter Department</div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  required={false}
                  label="Designation"
                  value={poc.designation}
                  onChange={(e) => {
                    handlePocChange(index, "designation", e.target.value);
                  }}
                  placeholder="Enter designation"
                />
              </div>
            </div>
          </div>
          <hr className="body_hr" />
          <div className="card-header">
            <div className="cardHeading">
              <h5 className="cardTitle">
                Please add POC social media profile details
              </h5>
            </div>
            <div className="cardAction">
              {poc.social_platforms?.length < 4 && (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleAddSocialLink(index)}
                >
                  Add Social Link
                </Button>
              )}
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                {poc.social_platforms?.map((socialLink, linkIndex) => (
                  <div className="row" key={linkIndex}>
                    <div className="col">
                      <CustomSelect
                        label={"Select Platform"}
                        dataArray={socialOptions}
                        optionId={"value"}
                        optionLabel={"label"}
                        selectedId={socialLink.platform}
                        setSelectedId={(value) => {
                          handleSocialLinkChange(
                            index,
                            linkIndex,
                            "platform",
                            value
                          );
                        }}
                      />
                      {/* <Select
                        placeholder="Select platform"
                        options={getAvailableOptions(index, linkIndex)}
                        value={socialOptions.find(
                          (option) => option.value === socialLink.platform
                        )}
                        onChange={(selectedOption) =>
                          handleSocialLinkChange(
                            index,
                            linkIndex,
                            "platform",
                            selectedOption.value
                          )
                        }
                      /> */}
                    </div>
                    <div className="col">
                      <FieldContainer
                        label="Link"
                        value={socialLink.link}
                        onChange={(e) =>
                          handleSocialLinkChange(
                            index,
                            linkIndex,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="Enter social link"
                      />
                    </div>
                    <div className="w-auto pt25">
                      <Button
                        className="iconBtn mt24"
                        onClick={() => handleDeleteSocialLink(index, linkIndex)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <FieldContainer
                  required={false}
                  label="Description"
                  value={poc.description}
                  onChange={(e) => {
                    handlePocChange(index, "description", e.target.value);
                  }}
                  placeholder="Enter description"
                />
              </div>
            </div>
          </div>
          <hr className="body_hr" />
          <div className="card-body">
            <div className="mb16">
              <p>
                Note:
                <br /> 1: Please ensure to fill proper details in POC-
                Email/Department/Designation/Contact/Socials.
              </p>
              <p>
                2: Kindly ask POC to share finance team contact & details for
                smooth journey.
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PointOfContact;
