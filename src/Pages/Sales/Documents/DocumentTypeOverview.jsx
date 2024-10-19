import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { useEditDocumentTypeMutation, useGetAllDocumentTypeQuery } from "../../../Redux/Slices/SalesSlices/DocumentTypeApi";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import View from "../../../Components/CommonComponent/View/View";


const DocumentTypeOverview = () => {
    const token = GetDecodedToken();
    let loginUserId;
    const loginUserRole = token.role_id;
    if (loginUserRole !== 1) {
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
                    <div className="flex-row">
                        <button
                            className="icon-1"
                            title="Edit"
                            onClick={() => {
                                setEditFlag(index);
                            }}
                        >
                            <i className="bi bi-pencil" />
                        </button>

                        {editflag === index && <button
                            className="icon-1"
                            title="Cancel Edit"
                            onClick={() => {
                                setEditFlag(false);
                            }}
                        >
                            <i className="bi bi-x-square-fill" />
                        </button>}

                        {editflag === index && <button
                            className="icon-1"
                            title="Save"
                            onClick={() => {
                                HandleSave(row, setEditFlag);
                            }}
                        >
                            <i className="bi bi-save" />
                        </button>}
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <div className="action_heading">
                <div className="action_title">
                    <FormContainer mainTitle={"Document Type"} link={true} />
                </div>
                {loginUserRole === 1 && <div className="action_btns">
                    <Link to={"/admin/sales-document-type-master"}>
                        <button className="btn cmnbtn btn-primary btn_sm">
                            Add Document Type
                        </button>
                    </Link>
                </div>}
            </div>
            <View
                columns={ViewDocumentTypeColumns}
                data={allDocumentType}
                // rowSelectable={true}
                pagination
                isLoading={isLoading}
                title={"Document Type overview"}
                tableName={"DocumentTypeOverview"}
            />
        </div>
    );
};

export default DocumentTypeOverview;
