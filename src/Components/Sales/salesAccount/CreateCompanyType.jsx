import React, { useCallback, useState } from "react";
import { useAddCompanyTypeMutation } from "../../../Redux/Slices/SalesSlices/CompanyTypeApi";
import { setLoader, toastAlert, toastError } from "../../../Utils/ToastUtil";
import Loader from "../../CommonComponent/Loader/Loader";

const CreateCompanyType = ({ loginUserId, closeModal }) => {
  const [companyTypeName, setCompanyTypeName] = useState("");
  const [description, setDescription] = useState("");
  const [addCompanyType, { isLoading, isSuccess, isError }] =
    useAddCompanyTypeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.length < 5) {
      toastError("Description must be at least 5 characters long.");
      return;
    }

    try {
      await addCompanyType({
        company_type_name: companyTypeName,
        description,
        created_by: loginUserId,
      }).unwrap();
      setCompanyTypeName("");
      setDescription("");
      isSuccess && toastAlert("Company Type added successfully");
      closeModal();
    } catch (err) {
      console.error("Failed to add company type:", err);
      toastError("Failed to add company type");
    }
  };
  useCallback(() => {
    setLoader(isLoading);
  }, [isLoading]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyTypeName">Company Type</label>
          <span style={{ color: "red" }}>*</span>
          <input
            type="text"
            id="companyTypeName"
            value={companyTypeName}
            onChange={(e) => setCompanyTypeName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <span style={{ color: "red" }}>*</span>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
          {description.length < 5 && (
            <small className="text-danger">
              Description must be at least 5 characters long.
            </small>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {isError && <p>Failed to add company type. Please try again.</p>}
    </div>
  );
};

export default CreateCompanyType;
