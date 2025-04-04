import React, { useState, useEffect, useCallback } from "react";
import FieldContainer from "../../../CommonComponent/FormElement/FieldContainer";
import CustomSelect from "../../../CommonComponent/FormElement/CustomSelect";

const ServiceIncentiveSharing = ({
  allSalesServiceData,
  selectedService,
  loginUser,
  userContextData,
  incentiveSharing,
  setIncentiveSharing,
  serviceField,
  setServiceField,
  allSalesService,
  setSelectedService,
  editFlag,
  setExecutiveEditFlag,
  executiveEditFlag,
  editIndex,
  insetServiceIncentivePercentage,
  userRole,
}) => {
  const [selectedExecutive, setSelectedExecutive] = useState();
  const [availableUsers, setAvailableUsers] = useState([]);
  const [executiveFields, setExecutiveFields] = useState([]);

  const [serviceIncentivePercentage, setServiceIncentivePercentage] =
    useState(100);

  useEffect(() => {
    // Filter the userContextData to exclude users already in executiveFields
    const filteredUsers = userContextData?.filter(
      (user) =>
        !executiveFields?.some((field) => field?.user_id === user?.user_id)
    );
    setAvailableUsers(filteredUsers);
  }, [executiveFields, userContextData]);

  useEffect(() => {
    setServiceIncentivePercentage((pre) => {
      if (pre > 100 || pre === undefined) {
        return 100;
      } else if (pre < 0) {
        return 0;
      }
      return pre;
    });
  }, [serviceIncentivePercentage]);

  useEffect(() => {
    if (selectedService) {
      setServiceIncentivePercentage(
        serviceField?.find((field) => field?.service_id === selectedService)
          ?.service_percentage
      );
    }
  }, [selectedService, executiveEditFlag, serviceField]);

  const handleExecutiveSelect = (executiveId, percent, isprev) => {
    const selectedUser = availableUsers?.find(
      (user) => user?.user_id === executiveId
    );
    setSelectedExecutive(executiveId);

    if (selectedUser) {
      setExecutiveFields((preExec) => [
        ...preExec,
        { user_id: executiveId, user_percentage: `${isprev ? percent : ""}` },
      ]);
      setAvailableUsers(
        availableUsers?.filter((user) => user?.user_id !== executiveId)
      );
    }
  };

  useEffect(() => {
    if (incentiveSharing.length === 0) {
      handleExecutiveSelect(userRole !== 1 ? loginUser : null, 100);
    } else {
      setExecutiveFields(incentiveSharing);
    }
  }, [userContextData, incentiveSharing, selectedService, selectedExecutive]);

  const handlePercentageChange = useCallback(
    (index, value) => {
      const newFields = executiveFields?.map((field, i) =>
        i === index ? { ...field, user_percentage: value } : field
      );
      setExecutiveFields(newFields);
    },
    [executiveFields]
  );

  const handleDelete = (index) => {
    const removedUser = executiveFields[index]?.user_id;
    setExecutiveFields((prevExec) => prevExec?.filter((_, i) => i !== index));
    setAvailableUsers((prevAvail) => [
      ...prevAvail,
      userContextData?.find((user) => user?.user_id === removedUser),
    ]);
    setSelectedExecutive();
  };

  useEffect(() => {
    if (!editFlag && executiveFields?.length > 0) {
      const totalPercentage = executiveFields
        ?.slice(0, -1)
        ?.reduce((acc, field) => acc + Number(field?.user_percentage || 0), 0);
      const remainingPercentage = Math.max(0, 100 - totalPercentage);
      setExecutiveFields((prevFields) => {
        const newFields = prevFields?.map((field, index) =>
          index === prevFields?.length - 1
            ? { ...field, user_percentage: remainingPercentage }
            : { ...field }
        );
        return newFields;
      });
    }
  }, [
    editFlag,
    executiveFields?.length,
    executiveFields
      ?.slice(0, -1)
      .map((field) => field?.user_percentage)
      .join(","),
  ]);

  const handleSubmit = async () => {
    const data = executiveFields.map((field) => ({
      user_id: field.user_id,
      user_percentage: Number(field.user_percentage),
    }));
    if (executiveEditFlag) {
      const updatedData = [...serviceField];

      updatedData[editIndex] = {
        service_id: selectedService,
        service_percentage: Number(serviceIncentivePercentage),
        incentive_sharing_users: executiveFields.map((field) => ({
          user_id: field.user_id,
          user_percentage: Number(field.user_percentage),
        })),
      };
      setServiceField(updatedData);
      setExecutiveEditFlag(false);
      setSelectedService();
      setIncentiveSharing(data);
      return;
    }

    setServiceField((prev) => [
      ...prev,
      {
        service_id: selectedService,
        service_percentage: Number(serviceIncentivePercentage),
        incentive_sharing_users: executiveFields.map((field) => ({
          user_id: field.user_id,
          user_percentage: Number(field.user_percentage),
        })),
      },
    ]);
    setSelectedService();
    setIncentiveSharing(data);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="cardHeading">
          <h5 className="cardTitle">{`${allSalesService?.find((data) => data?._id === selectedService)
              ?.service_name
            } Service Sharing`}</h5>
        </div>
      </div>

      <div className="card-body row">
        <FieldContainer
          fieldGrid={12}
          label={"Service Sharing Percentage"}
          type="number"
          placeholder="Percentage"
          value={serviceIncentivePercentage}
          onChange={(e) => {
            setServiceIncentivePercentage(e.target.value);
          }}
        />

        <CustomSelect
          fieldGrid="12"
          label="Executives"
          dataArray={availableUsers}
          optionId="user_id"
          optionLabel="user_name"
          selectedId={selectedExecutive}
          setSelectedId={handleExecutiveSelect}
        />

        {executiveFields.map((field, index) => (
          <div key={index} className="col-12 row mt-3 align-items-center">
            <div className="col-4">
              <label className="form-label">Executive Name </label>
              <input
                type="text"
                className="form-control"
                value={
                  userContextData?.find(
                    (user) => user?.user_id === field?.user_id
                  )?.user_name
                }
              />
            </div>
            <div className="col-4">
              <label className="form-label">Percentage</label>
              <input
                type="number"
                className="form-control"
                placeholder="Percentage"
                value={field.user_percentage}
                onChange={(e) => handlePercentageChange(index, e.target.value)}
              // disabled={index === executiveFields.length - 1}
              />
            </div>
            <div className="col-2 mt-4">
              <button
                title="Delete"
                className="icon-1"
                onClick={() => handleDelete(index)}
              >
                <i className="bi bi-trash" />
              </button>
            </div>
          </div>
        ))}

        <div className="col-12 mt-3">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={
              // selectedService === serviceField?.find(data => data?.service_id === selectedService)?.service_id ||
              executiveFields.length <= 1 ||
              executiveFields.reduce(
                (acc, field) => acc + Number(field.user_percentage || 0),
                0
              ) !== 100
            }
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceIncentiveSharing;
