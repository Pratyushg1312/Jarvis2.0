import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddPaymentModeMutation,
  useGetAllPaymentModesQuery,
  useGetSinglePaymentModeQuery,
  useUpdatePaymentModeMutation,
} from "../../../../Redux/Slices/SalesSlices/PaymentModeApi";
import FormContainer from "../../../../Components/CommonComponent/FormElement/FormContainer";
import FieldContainer from "../../../../Components/CommonComponent/FormElement/FieldContainer";
import { toastAlert, toastError } from "../../../../Utils/ToastUtil";
import GetDecodedToken from "../../../../Utils/GetDecodedToken";
import { Button } from "@mui/material";

const CreatePaymentMode = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const token = GetDecodedToken();
  const loginUserId = token.id;

  const [addMode, { isLoading: addModeLoading, isError: addModeError }] =
    useAddPaymentModeMutation();
  const { refetch } = useGetAllPaymentModesQuery();
  const {
    data: paymentModeData,
    isLoading: paymentModeLoading,
    isError: paymentModeError,
  } = useGetSinglePaymentModeQuery(id, { skip: !id });

  const [
    updateMode,
    { isLoading: updateModeLoading, isError: updateModeError },
  ] = useUpdatePaymentModeMutation();

  useEffect(() => {
    if (paymentModeData) {
      setTitle(paymentModeData.payment_mode_name);
    }
  }, [paymentModeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }
    const formData = new FormData();
    formData.append("payment_mode_name", title);
    formData.append("created_by", loginUserId);
    try {
      if (!id) {
        await addMode(formData).unwrap();
        toastAlert("Payment Mode Created");
      } else {
        await updateMode({ id, payment_mode_name: title }).unwrap();

        setTitle("");
        toastAlert("Payment Mode Updated");
      }
      refetch();
      navigate("/sales/payment-mode-overview");
    } catch (error) {
      toastError(error.message);
    }
  };
  return (
    <>
      <FormContainer mainTitle="Payment Mode" link={"true"} />

      <div className="card">
        <div className="card-header">
          <div className="cardHeading">
            <h5 className="cardTitle">Create Payment Mode</h5>
          </div>
        </div>
        <div className="card-body row ">
          <FieldContainer
            label="Mode Title"
            placeholder={"Enter Mode Title"}
            fieldGrid={4}
            astric={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={addModeLoading || updateModeLoading}
      >
        Submit
      </Button>
    </>
  );
};

export default CreatePaymentMode;
