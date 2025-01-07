import React, { useState } from "react";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { useCreateInvoiceParticularMutation } from "../../../Redux/Slices/SalesSlices/InvoiceParticularApi";
import FormContainer from "../../CommonComponent/FormElement/FormContainer";
import FieldContainer from "../../CommonComponent/FormElement/FieldContainer";

const InvoiceParticular = ({ setIsModalOpen }) => {
  const [invoiceName, setInvoiceName] = useState("");
  const [description, setDescription] = useState("");
  const [createdata, { isLoading, isError }] =
    useCreateInvoiceParticularMutation();

  const user_id = GetDecodedToken.id;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      invoice_particular_name: invoiceName,
      remarks: description,
      created_by: user_id,
    };
    try {
      await createdata(payload).unwrap();
      setIsModalOpen(false);
      toastAlert("Invoice Particular Created successfully");
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  return (
    <div>
      <FormContainer link={true} mainTitle={"Create Invoice Particular"} />
      <div className="card">
        <FieldContainer
          type="input"
          fieldGrid={12}
          label={"Invoice Particular Name"}
          astric
          value={invoiceName}
          onChange={(e) => setInvoiceName(e.target.value)}
        />
        <FieldContainer
          type="input"
          fieldGrid={12}
          label={"Remarks"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="btn-primary" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </div>
  );
};

export default InvoiceParticular;
