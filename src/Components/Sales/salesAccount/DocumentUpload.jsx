import React, { useCallback, useEffect } from "react";
import { useDeleteDocumentMutation } from "../../../Redux/Slices/SalesSlices/DocumentTypeApi";
import { useGstDetailsMutation } from "../../../Redux/Slices/GstSlices/GetGstDetailApi";
import CustomSelect from "../../CommonComponent/FormElement/CustomSelect";
import FieldContainer from "../../CommonComponent/FormElement/FieldContainer";
import { debounce } from "../../../Utils/debounce";
import { Button } from "@mui/material";
import { Trash } from "@phosphor-icons/react";

const DocumentUpload = ({
  documents,
  setDocuments,
  documentTypes,
  isValidDoc,
  setIsValidDoc,
  toastAlert,
  toastError,
  id,
  setGstDetails,
}) => {
  const [
    deleteDocument,
    { isLoading: documentDeleteLoading, isSuccess: documentDeleted },
  ] = useDeleteDocumentMutation();

  const [getGst, { isLoading: gstLoading, error: gstError }] =
    useGstDetailsMutation();

  const debouncedGstApiCall = useCallback(
    debounce(async (gstNo) => {
      try {
        const response = await getGst({ gstNo }).unwrap();
        setGstDetails(response);
        toastAlert("Gst Details fetched");
      } catch (error) {
        console.error("API call error:", error);
        toastError("GST API failed", error.message);
      }
    }, 2000),
    [getGst, toastAlert, toastError]
  );

  const handleDocumentChange = (index, key, value) => {
    const updatedDocuments = documents?.map((doc, docIndex) =>
      docIndex === index ? { ...doc, [key]: value } : doc
    );
    setIsValidDoc({
      ...isValidDoc,
      [index]: { ...isValidDoc[index], [key]: value },
    });
    setDocuments(updatedDocuments);

    if (
      updatedDocuments[index].document_master_id ===
        "665dbc0d1df407940c078fd5" &&
      key === "document_no" &&
      value.length > 13
    ) {
      debouncedGstApiCall(value);
    }
  };

  const handleDeleteDocument = async (index) => {
    const document = documents[index];
    if (document._id) {
      try {
        await deleteDocument(document._id).unwrap();
        toastAlert("Document deleted successfully");
      } catch (error) {
        toastError("Failed to delete document", error.message);
        return;
      }
    }

    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
  };

  const getSelectedTypeLabel = (selectedId) => {
    const selectedType = documentTypes?.find(
      (type) => type?._id === selectedId
    );
    return selectedType ? selectedType.document_name : "";
  };

  const getAvailableDocumentTypes = (currentIndex) => {
    const selectedTypes = documents
      ?.map((doc) => doc.document_master_id)
      ?.filter(Boolean);
    return documentTypes?.filter(
      (type) =>
        !selectedTypes.includes(type._id) ||
        documents[currentIndex].document_master_id === type._id
    );
  };

  return (
    <>
      {documents?.map((document, index) => (
        <div className="card" key={index}>
          <div className="card-header">
            <div className="cardHeading">
              <h5 className="cardTitle">Document ({index + 1})</h5>
            </div>
            <div className="cardAction">
              <Button
                className="iconBtn"
                onClick={() => handleDeleteDocument(index)}
                disabled={documentDeleteLoading}
              >
                <Trash />
              </Button>
            </div>
          </div>
          <div className="card-body">
            <div className="row document-container">
              <div className="col-md-4 col-12">
                <CustomSelect
                  label="Type"
                  fieldGrid={12}
                  dataArray={getAvailableDocumentTypes(index)}
                  optionId="_id"
                  optionLabel="document_name"
                  selectedId={document.document_master_id}
                  setSelectedId={(value) =>
                    handleDocumentChange(index, "document_master_id", value)
                  }
                  required={false}
                />
              </div>

              <div className="col-md-4 col-12">
                <FieldContainer
                  label={`${getSelectedTypeLabel(
                    document?.document_master_id
                  )} Number`}
                  placeholder={`Enter ${getSelectedTypeLabel(
                    document.document_master_id
                  )} number here`}
                  type="text"
                  fieldGrid={12}
                  value={document.document_no || ""}
                  onChange={(e) =>
                    handleDocumentChange(index, "document_no", e.target.value)
                  }
                  required={false}
                />
              </div>

              <div className="col-md-4 col-12">
                <FieldContainer
                  label="Document File"
                  type="file"
                  fieldGrid={
                    id !== "0" && document?.document_image_upload ? 12 : 12
                  }
                  onChange={(e) =>
                    handleDocumentChange(index, "file", e.target.files[0])
                  }
                  required={false}
                />
                {id !== "0" && document?.document_image_upload ? (
                  <a href={document.document_image_upload} className="mt-2">
                    <button className="cmnbtn btn btn_sm btn-primary mt-4 ">
                      <i className="bi bi-download"></i>
                    </button>
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DocumentUpload;
