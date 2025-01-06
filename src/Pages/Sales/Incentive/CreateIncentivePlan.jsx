import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateIncentivePlanMutation,
  useGetIncentivePlanDetailsQuery,
  useUpdateIncentivePlanMutation,
} from "../../../Redux/Slices/SalesSlices/IncentivePlanApi";
import { useGetAllSaleServiceQuery } from "../../../Redux/Slices/SalesSlices/SalesServiceApi";
import { setLoader, toastAlert, toastError } from "../../../Utils/ToastUtil";
import Loader from "../../../Components/CommonComponent/Loader/Loader";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import FieldContainer from "../../../Components/CommonComponent/FormElement/FieldContainer";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import Select from "react-select";
import DynamicSelect from "../../../Components/CommonComponent/FormElement/DynamicSelect";
import CustomSelect from "../../../Components/CommonComponent/FormElement/CustomSelect";

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

  const [
    updateIncentive,
    { isLoading: incentiveupdateLoading, error: incentiveupdateError },
  ] = useUpdateIncentivePlanMutation();

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
    isLoading: incentiveGetLoading,
  } = useGetIncentivePlanDetailsQuery(id, { skip: id === "create" });

  useEffect(() => {
    if (incentiveData) {
      setRemarks(incentiveData.remarks);
      setServiceName(incentiveData.sales_service_master_id);
      setValues(incentiveData.value);
      setIncentiveType(incentiveData.incentive_type);
    }
  }, [incentiveData]);

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
  useCallback(() => {
    setLoader(salesServiceLoading);
  }, [salesServiceLoading]);

  return (
    <div>
      <FormContainer mainTitle="Incentive Plan" link={true} />
      <div className="card">
        <div className="card-header">
          <div className="cardHeading">
            <h5 className="cardTitle">Incentive Plan Creation</h5>
          </div>
        </div>
        <div className="card-body row">
          <div className="form-group col-4">
            <CustomSelect
              label={"Service Name"}
              dataArray={allSalesServiceData}
              optionId={"_id"}
              optionLabel={"service_name"}
              selectedId={servicename}
              setSelectedId={(value) => {
                setServiceName(value);
                setIsValid({ ...isValid, sales_service_master_id: false });
              }}
              required={true}
            />

            {isValid.sales_service_master_id && (
              <span className="form-error">Service Name is Required</span>
            )}
          </div>
          <div className="form-group col-4">
            <CustomSelect
              required={true}
              label={"Incentive Type"}
              dataArray={IncentiveTypeData}
              optionId={"value"}
              optionLabel={"label"}
              selectedId={incentiveType}
              setSelectedId={(value) => {
                setIncentiveType(value);
                setIsValid({ ...isValid, incentive_type: false });
              }}
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
