import React, { useCallback, useState } from "react";
import { useCreateDepartmentMutation } from "../../../Redux/Slices/SalesSlices/DepartmentApi";
import { setLoader, toastAlert, toastError } from "../../../Utils/ToastUtil";
import Loader from "../../CommonComponent/Loader/Loader";

const CreateDepartment = ({ loginUserId, closeModal }) => {
  const [department, setDepartment] = useState("");
  const [addDepartment, { isLoading, isSuccess, isError }] =
    useCreateDepartmentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDepartment({
        department_name: department,
        created_by: loginUserId,
      }).unwrap();
      setDepartment("");
      closeModal();
      toastAlert("Department added successfully");
    } catch (err) {
      console.error("Failed to add department:", err);
      toastError("Failed to add department");
    }
  };
  useCallback(() => {
    setLoader(isLoading);
  }, [isLoading]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="department">Add Department</label>
          <span style={{ color: "red" }}>*</span>
          <input
            type="text"
            placeholder="Enter Department"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button
          type="submit"
          className="btn cmnbtn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {isSuccess && <p>Department added successfully!</p>}
      {isError && <p>Failed to add Department. Please try again.</p>}
    </div>
  );
};

export default CreateDepartment;
