import React, { useEffect, useState } from "react";
import ServiceIncentiveSharing from "./ServiceIncentiveSharing";
import CustomSelect from "../../../CommonComponent/FormElement/CustomSelect";
import FieldContainer from "../../../CommonComponent/FormElement/FieldContainer";
import { Button } from "@mui/material";
import { Trash } from "@phosphor-icons/react";

const EditIncentiveSharing = ({
  accountincentivepercentage,
  setAccountIncentivePercentage,
  allSalesServiceData,
  selectedService,
  setSelectedService,
  incentiveSharing,
  setIncentiveSharing,
  serviceField,
  setServiceField,
  allSalesService,
  editFlag,
  incentiveSharingLoading,
  handelSubmit,
  loginUser,
  userContextData,
  removeServices,
  userRole,
}) => {
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(false);
  const [prevData, setPrevData] = useState([]); // To store previous data
  const [executiveEditFlag, setExecutiveEditFlag] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  let insetServiceIncentivePercentage;

  useEffect(() => {
    if (check) {
      if (serviceField?.length === 0) {
        setCheck(false);
        setError(true);
        return;
      }
      setError(false);
      // If checkbox is checked, populate all services with the same data
      setServiceField((prev) => {
        const populated = allSalesServiceData?.map((field, index) => {
          const prevField = prev[prevData?.length - 1] || {}; // Get the last data
          return {
            service_id: field?._id,
            service_percentage: prevField?.service_percentage || 0, // Populate with previous data
            incentive_sharing_users: prevField?.incentive_sharing_users || [], // Populate with previous data
          };
        });

        return [...prev, ...populated];
      });
    } else {
      // Restore the previous data when unchecked
      setServiceField(prevData);
    }
  }, [check]);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      // Store the current service field data when checkbox is checked
      setPrevData(serviceField);
    }
    setCheck((prev) => !prev); // Toggle the checkbox state
  };

  return (
    <>
      <div className="row">
        <FieldContainer
          fieldGrid={12}
          label={"Account Sharing Percentage"}
          type="number"
          placeholder="Percentage"
          value={accountincentivepercentage}
          onChange={(e) => {
            setAccountIncentivePercentage(e.target.value);
          }}
        />

        <CustomSelect
          fieldGrid={12}
          label="Services"
          dataArray={allSalesServiceData}
          optionId="_id"
          optionLabel="service_name"
          selectedId={selectedService}
          setSelectedId={setSelectedService}
        />

        <div className="flex-row flex-grid gap-2">
          <div className="flex-lg-wrap colGap16 ">
            {serviceField?.map((field, index) => (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setSelectedService(field?.service_id);
                  setIncentiveSharing(field?.incentive_sharing_users);
                  insetServiceIncentivePercentage = field?.service_percentage;
                  setExecutiveEditFlag(true);
                  setEditIndex(index);
                }}
                // endIcon={

                // }
                key={index}
              >
                {
                  allSalesService?.find(
                    (data) => data?._id === field?.service_id
                  )?.service_name
                }
                <span className="badge">
                  <Trash title="remove" onClick={() => removeServices(index)} />
                </span>
              </Button>
            ))}
          </div>

          <div className="form-group col-12 mt-5 mr-2 pl-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={check}
              onChange={(e) => handleCheckboxChange(e)}
            />

            <label className="mt-1 mr-2 d-flex gap-3">
              Do you want to set the same Service percentage with the same user
              and user percentage for all services?
              <i
                style={{ cursor: "pointer" }}
                className="bi bi-info-circle-fill warningText"
              />
            </label>
            <p className="form-error">
              {error && "Please add atleast one service"}
            </p>
          </div>
        </div>

        {selectedService && (
          <ServiceIncentiveSharing
            editFlag={editFlag}
            allSalesServiceData={allSalesServiceData}
            selectedService={selectedService}
            loginUser={loginUser}
            userContextData={userContextData}
            incentiveSharing={incentiveSharing}
            setIncentiveSharing={setIncentiveSharing}
            serviceField={serviceField}
            setServiceField={setServiceField}
            allSalesService={allSalesService}
            setSelectedService={setSelectedService}
            setExecutiveEditFlag={setExecutiveEditFlag}
            executiveEditFlag={executiveEditFlag}
            editIndex={editIndex}
            insetServiceIncentivePercentage={insetServiceIncentivePercentage}
            userRole={userRole}
          />
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        className="btn btn-primary mt-5"
        disabled={incentiveSharingLoading}
        onClick={(e) => handelSubmit(e)}
      >
        Submit
      </Button>
    </>
  );
};

export default EditIncentiveSharing;
