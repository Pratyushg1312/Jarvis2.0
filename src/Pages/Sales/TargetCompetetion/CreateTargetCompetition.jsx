import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../Components/CommonComponent/FormElement/PageHeader";
import FieldContainer from "../../../Components/CommonComponent/FormElement/FieldContainer";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import {
  useAddTargetCompetitionMutation,
  useEditTargetCompetitionMutation,
  useGetSingleTargetCompetitionQuery,
} from "../../../Redux/Slices/SalesSlices/TargetCompetitionApi";

const CreateTargetCompetition = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL params (used for editing)
  const loginUserId = GetDecodedToken()?.id;

  // Form state
  const [competitionName, setCompetitionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  // Validation state
  const [isValidate, setIsValidate] = useState({
    competitionName: false,
    startDate: false,
    endDate: false,
    targetAmount: false,
  });

  // Fetch existing data for edit mode
  const { data: competitionData, isLoading: fetchingData } =
    useGetSingleTargetCompetitionQuery(id, {
      skip: !id, // Skip the query if there's no ID (create mode)
    });

  const [addTargetCompetition, { isLoading: adding }] =
    useAddTargetCompetitionMutation();
  const [editTargetCompetition, { isLoading: editing }] =
    useEditTargetCompetitionMutation();

  // Populate form fields in edit mode
  useEffect(() => {
    if (competitionData) {
      const formattedStartDate = new Date(competitionData.start_date)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(competitionData.end_date)
        .toISOString()
        .split("T")[0];

      setCompetitionName(competitionData.competition_name);
      setStartDate(formattedStartDate); // Ensure it's in YYYY-MM-DD format
      setEndDate(formattedEndDate);
      setTargetAmount(competitionData.target_amount);
    }
  }, [competitionData]);

  // Validation logic
  const validateFields = () => {
    const errors = {
      competitionName: !competitionName,
      startDate: !startDate,
      endDate: !endDate,
      targetAmount: !targetAmount || targetAmount <= 0,
    };

    setIsValidate(errors);
    return !Object.values(errors).some(Boolean); // Returns true if no errors
  };

  // Form submission handler (create or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      toastError("Please fill in all required fields.");
      return;
    }

    const payload = {
      competition_name: competitionName,
      start_date: startDate,
      end_date: endDate,
      target_amount: targetAmount,
      created_by: loginUserId,
    };

    try {
      if (id) {
        // Edit mode
        await editTargetCompetition({ id, ...payload }).unwrap();
        toastAlert("Target competition updated successfully");
      } else {
        // Create mode
        await addTargetCompetition(payload).unwrap();
        toastAlert("Target competition created successfully");
      }

      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      toastError(
        error.data?.message ||
          `Failed to ${id ? "update" : "create"} target competition`
      );
    }
  };

  return (
    <div>
      <PageHeader
        mainTitle={id ? "Edit Target Competition" : "Create Target Competition"}
        link="/"
      />
      <div className="card">
        <div className="card-header">
          <div className="cardHeading">
            <h5 className="cardTitle">
              {id ? "Edit Target Competition" : "Create Target Competition"}
            </h5>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 col-12">
              <FieldContainer
                type="text"
                label="Competition Name"
                placeholder="Enter competition name"
                astric
                required
                value={competitionName}
                onChange={(e) => {
                  setCompetitionName(e.target.value);
                  setIsValidate((prev) => ({
                    ...prev,
                    competitionName: false,
                  }));
                }}
              />
              {isValidate.competitionName && (
                <div className="form-error">Please Enter Competition Name</div>
              )}
            </div>
            <div className="col-md-3 col-12">
              <FieldContainer
                type="date"
                label="Start Date"
                astric
                required
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setIsValidate((prev) => ({ ...prev, startDate: false }));
                }}
              />
              {isValidate.startDate && (
                <div className="form-error">Please Enter Start Date</div>
              )}
            </div>
            <div className="col-md-3 col-12">
              <FieldContainer
                type="date"
                label="End Date"
                required
                astric
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setIsValidate((prev) => ({ ...prev, endDate: false }));
                }}
              />
              {isValidate.endDate && (
                <div className="form-error">Please Enter End Date</div>
              )}
            </div>
            <div className="col-md-3 col-12">
              <FieldContainer
                type="number"
                label="Target Amount"
                placeholder="Enter target amount"
                required
                astric
                value={targetAmount}
                onChange={(e) => {
                  setTargetAmount(e.target.value);
                  setIsValidate((prev) => ({ ...prev, targetAmount: false }));
                }}
              />
              {isValidate.targetAmount && (
                <div className="form-error">
                  Please Enter a Valid Target Amount
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={adding || editing || fetchingData} // Disable button while loading
          >
            {adding || editing ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTargetCompetition;
