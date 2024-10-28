import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateIncentivePlanMutation, useGetIncentivePlanDetailsQuery, useUpdateIncentivePlanMutation } from "../../../Redux/Slices/SalesSlices/IncentivePlanApi";
import { useGetAllSaleServiceQuery } from "../../../Redux/Slices/SalesSlices/SalesServiceApi";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import Loader from "../../../Components/CommonComponent/Loader/Loader";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import FieldContainer from "../../../Components/CommonComponent/FormElement/FieldContainer";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import Select from "react-select";

const CreateIncentivePlan = () => {
  const { id } = useParams();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const userID = GetDecodedToken().id;
  const [servicename, setServiceName] = useState("");
  const [incentiveType, setIncentiveType] = useState("");
  const [values, setValues] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isValid, setIsValid] = useState({
    sales_service_master_id: false,
    incentive_type: false,
    value: false,
  });

  const navigate = useNavigate();
  const IncentiveTypeData = [
    { value: "fixed", label: "Fixed" },
    { value: "variable", label: "Variable" },
  ];

  const [updateIncentive, {
    isLoading: incentiveupdateLoading,
    error: incentiveupdateError,
  }] = useUpdateIncentivePlanMutation();

  const [addIncentive, { isLoading: incentiveLoading, error: incentiveError }] =
    useCreateIncentivePlanMutation();

  const {
    data: allSalesServiceData,
    isLoading: salesServiceLoading,
    isError: salesServiceError,
  } = useGetAllSaleServiceQuery();


  const {
    data: incentiveData,
    isError: incentiveGetError,
    isLoading: incentiveGetLoading
  } = useGetIncentivePlanDetailsQuery(id, { skip: id === "create" });

  useEffect(() => {
    if (incentiveData) {
      setRemarks(incentiveData.remarks);
      setServiceName(incentiveData.sales_service_master_id);
      setValues(incentiveData.value);
      setIncentiveType(incentiveData.incentive_type);
    }
  }, [incentiveData])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      sales_service_master_id: servicename,
      incentive_type: incentiveType,
      value: values,
      created_by: userID,
    };
    const newValidationState = {
      sales_service_master_id: !servicename,
      incentive_type: !incentiveType,
      value: !values,
    };
    const hasErrors = Object.values(newValidationState).some(
      (isInvalid) => isInvalid
    );
    setIsValid(newValidationState);
    if (hasErrors) {
      return;
    }
    try {
      if (id === "create") {
        await addIncentive(payload).unwrap();
        toastAlert("Submitted Successfully");
        setServiceName("");
        setIsFormSubmitted(true);
      } else {
        await updateIncentive({ id, ...payload }).unwrap();
        toastAlert("Updated Successfully");
        setServiceName("");
        setIsFormSubmitted(true);
      }
    } catch (error) {
      console.error(error);
      toastError("Failed to submit");
    }
  };

  if (isFormSubmitted) {
    navigate("/sales/incentive-plan-overview");
  }

  return (
    <div>
      {salesServiceLoading && <Loader />}
      <FormContainer mainTitle="Incentive Plan" link={true} />
      <div className="card">
        <div className="card-header">
          <h1 className="cardHeading">Incentive Plan Creation</h1>
        </div>
        <div className="card-body row">
          <div className="form-group col-4">
            <label className="form-label">
              Service Name <sup style={{ color: "red" }}>*</sup>
            </label>
            <Select
              options={allSalesServiceData?.map((opt) => ({
                value: opt._id,
                label: opt.service_name,
              }))}
              value={{
                value: servicename,
                label:
                  allSalesServiceData?.find((user) => user._id === servicename)
                    ?.service_name || "",
              }}
              onChange={(e) => {
                setServiceName(e.value);
                setIsValid({ ...isValid, sales_service_master_id: false });
              }}
              required
            />
            {isValid.sales_service_master_id && (
              <span className="form-error">Service Name is Required</span>
            )}
          </div>
          <div className="form-group col-4">
            <label className="form-label">
              Incentive Type <sup style={{ color: "red" }}>*</sup>
            </label>
            <Select
              options={IncentiveTypeData}
              value={IncentiveTypeData.find(
                (opt) => opt.value === incentiveType
              )}
              onChange={(e) => {
                setIncentiveType(e.value);
                setIsValid({
                  ...isValid,
                  incentive_type: false,
                });
              }}
              required
            />
            {isValid.incentive_type && (
              <span className="form-error">Incentive Type is Required</span>
            )}
          </div>
          <div className="col-4">
            <FieldContainer
              label="Value"
              astric={true}
              type="number"
              fieldGrid={12}
              value={values}
              required
              onChange={(e) => {
                setValues(e.target.value);
                setIsValid({
                  ...isValid,
                  value: false,
                });
              }}
            />
            {isValid.value && (
              <span className="form-error">Value is Required</span>
            )}
          </div>
          <FieldContainer
            label={"Remarks"}
            type={"text"}
            fieldGrid={12}
            value={remarks}
            required={false}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
      </div>
      <button
        className="cmnbtn btn btn-primary mb-5"
        disabled={incentiveLoading}
        onClick={handleSubmit}
      >
        {incentiveLoading ? "Submitting" : "Submit"}
      </button>
    </div>
  );
};

export default CreateIncentivePlan;
