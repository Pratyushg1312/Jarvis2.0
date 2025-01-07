import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import {
  useEditDocumentTypeMutation,
  useGetAllDocumentTypeQuery,
} from "../../../Redux/Slices/SalesSlices/DocumentTypeApi";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import View from "../../../Components/CommonComponent/View/View";
import { FloppyDisk, PencilSimple, X } from "@phosphor-icons/react";
import { useGetUserAuthQuery } from "../../../Redux/Slices/UserSlices/UserApi";

const DocumentTypeOverview = () => {
  const token = GetDecodedToken();
  const navigate = useNavigate();
  let loginUserId;
  const loginUserRole = token.role_id;
  const { data: userAuthData } = useGetUserAuthQuery(token.id);
  if (userAuthData?.find((data) => data?._id == 64)?.view_value !== 1) {
    loginUserId = token.id;
  }
  const {
    data: allDocumentType,
    error: allDocumentTypeError,
    isLoading,
    refetch,
  } = useGetAllDocumentTypeQuery();
  const [editDocument, { isLoading: isEditing, error: editError }] =
    useEditDocumentTypeMutation();

  const HandleSave = async (row, setEditFlag) => {
    // let id = row._id
    const payload = {
      id: row._id,
      updated_by: loginUserId,
      document_name: row.document_name,
      description: row.description,
    };
    try {
      await editDocument(payload).unwrap();
      setEditFlag(false);
      toastAlert("Document Type Updated Successfully");
      // refetch();
    } catch (error) {
      setEditFlag(false);

      console.error(error);
      toastError(error.data.message);
    }
  };
  const ViewDocumentTypeColumns = [
    {
      key: "sno",
      name: "S.No",
      renderRowCell: (row, index) => index + 1,
      Width: 50,
    },
    {
      key: "document_name",
      name: "Document Name",
      editable: true,
      Width: 100,
    },
    {
      key: "description",
      name: "Description",
      editable: true,
      Width: 100,
    },
    {
      key: "Action_edits",
      name: "Actions",
      Width: 100,
      renderRowCell: (row, index, setEditFlag, editflag) => {
        return (
          <div className="flexCenter colGap12">
            <button
              className="iconBtn"
              title="Edit"
              onClick={() => {
                setEditFlag(index);
              }}
            >
              <PencilSimple />
            </button>

            {editflag === index && (
              <button
                className="iconBtn btn-outline-danger sm"
                title="Cancel Edit"
                onClick={() => {
                  setEditFlag(false);
                }}
              >
                <X />
              </button>
            )}

            {editflag === index && (
              <button
                className="iconBtn btn-success sm"
                title="Save"
                onClick={() => {
                  HandleSave(row, setEditFlag);
                }}
              >
                <FloppyDisk />
              </button>
            )}
          </div>
        );
      },
    },
  ];
  const LinkButtons = [
    {
      type: "button",
      name: "Add Document Type",
      access: [1],
      onClick: () => navigate("/sales/create-document-type"),
    },
  ];
  return (
    <>
      <FormContainer
        mainTitle={"Document Type"}
        link={true}
        LinkButtons={LinkButtons}
      />

      <View
        columns={ViewDocumentTypeColumns}
        data={allDocumentType}
        // rowSelectable={true}
        pagination
        isLoading={isLoading}
        title={"Document Type overview"}
        tableName={"DocumentTypeOverview"}
      />
    </>
  );
};

export default DocumentTypeOverview;
