import React, { useCallback, useState } from "react";
import { useAddBrandMutation } from "../../../Redux/Slices/SalesSlices/BrandApi";
import Loader from "../../CommonComponent/Loader/Loader";
import { setLoader, toastAlert, toastError } from "../../../Utils/ToastUtil";
import CustomSelect from "../../CommonComponent/FormElement/CustomSelect";

const CreateBrand = ({
  loginUserId,
  closeModal,
  allBrandCatType,
  accountName,
  setSelectedBrand,
  setSelectedAccountType,
  // openModal,
  setSelectedCategoryParent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [brandName, setBrandName] = useState("");
  const [useAccountName, setUseAccountName] = useState(false);
  const [addBrand, { isLoading, isSuccess, isError }] = useAddBrandMutation();

  const handleCheckboxChange = (e) => {
    setUseAccountName(e.target.checked);
    if (e.target.checked) {
      setBrandName(accountName);
    } else {
      setBrandName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand_name", brandName);
    formData.append("brand_category_id", selectedCategory);
    formData.append("created_by", loginUserId);

    try {
      const response = await addBrand(formData).unwrap();
      setSelectedCategoryParent(selectedCategory);
      setBrandName("");
      setUseAccountName(false);
      setSelectedBrand(response?.data?._id);
      setSelectedAccountType("667a67ea103891b6efac238f");
      closeModal();
      toastAlert("Brand added successfully");
    } catch (err) {
      console.error("Failed to add brand:", err);
      toastError("Failed to add brand");
    }
  };
  useCallback(() => {
    setLoader(isLoading);
  }, [isLoading]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brandName">Add Brand</label>
          <span style={{ color: "red" }}>*</span>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="form-control"
            required
            disabled={useAccountName}
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            id="useAccountName"
            checked={useAccountName}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="useAccountName">Use account name as brand name</label>
        </div>

        <CustomSelect
          fieldGrid={12}
          label="Industry"
          dataArray={allBrandCatType}
          optionId="_id"
          optionLabel="brand_category_name"
          selectedId={selectedCategory}
          setSelectedId={setSelectedCategory}
          required
        />

        {/* <div className="flex-row gap-2 mb28">
          <button
            type="button"
            className="btn iconBtn btn-outline-primary"
            onClick={() => openModal("brandCategory")}
          >
            +
          </button>
          <button
            type="button"
            className="btn iconBtn btn-outline-primary"
            onClick={() => openModal("viewBrandCategory")}
          >
            <i className="bi bi-eye" />
          </button>
        </div> */}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {isSuccess && <p>Brand added successfully!</p>}
      {isError && <p>Failed to add brand. Please try again.</p>}
    </div>
  );
};

export default CreateBrand;
