import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddDocumentTypeMutation } from "../../../Redux/Slices/SalesSlices/DocumentTypeApi";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import PageHeader from "../../../Components/CommonComponent/FormElement/PageHeader";
import FieldContainer from "../../../Components/CommonComponent/FormElement/FieldContainer";
import { Button } from "@mui/material";

const CreateDocumentType = () => {
  const navigate = useNavigate();
  const [DocumentName, setDocumentName] = useState("");
  const [DocumentDescription, setDocumentDescription] = useState("");
  const [addDocumentType, { data, error, isLoading }] =
    useAddDocumentTypeMutation();
  const [isValidate, setIsValidate] = useState({
    DocumentName: false,
    DocumentDescription: false,
  });
  const userID = GetDecodedToken().id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (DocumentName === "") {
      setIsValidate((prevState) => ({ ...prevState, DocumentName: true }));
    }

    if (DocumentDescription === "") {
      setIsValidate((prevState) => ({
        ...prevState,
        DocumentDescription: true,
      }));
    }

    if (DocumentName === "" || DocumentDescription === "") {
      toastError("Please fill all the fields");
      return;
    }

    const payload = {
      document_name: DocumentName,
      description: DocumentDescription,
      created_by: userID,
    };
    try {
      await addDocumentType(payload).unwrap();
      toastAlert("Document Added Sucessfully");
      navigate(-1);
    } catch (error) {
      toastError(error.data.message);
    }
  };

  return (
    <div>
      <PageHeader mainTitle={"Documents Master"} link={"/"} />
      <div className="card">
        <div class="card-header">
          <div class="cardHeading">
            <h5 class="cardTitle">Create Document</h5>
          </div>
        </div>
        <div className="card-body row">
          <div className="col-4">
            <FieldContainer
              type="text"
              label="Document Name"
              placeholder="Enter Document Name"
              astric
              fieldGrid={12}
              required
              value={DocumentName}
              onChange={(e) => {
                setDocumentName(e.target.value);
                setIsValidate({ ...isValidate, DocumentName: false });
              }}
            />
            {isValidate.DocumentName && (
              <div className="form-error">Please Enter Document Name</div>
            )}
          </div>
          <div className="col-4">
            <FieldContainer
              type="text"
              label="Document Description"
              placeholder="Enter Document Description"
              fieldGrid={12}
              required
              astric
              value={DocumentDescription}
              onChange={(e) => {
                setDocumentDescription(e.target.value);
                setIsValidate({ ...isValidate, DocumentDescription: false });
              }}
            />
            {isValidate.DocumentDescription && (
              <div className="form-error">
                Please Enter Document Description
              </div>
            )}
          </div>
        </div>
        <div className="card-footer">
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateDocumentType;
