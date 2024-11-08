import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import DateISOtoNormal from "../../../Utils/DateISOtoNormal";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import { formatIndianNumber } from "../../../Utils/formatIndianNumber";
import Loader from "../../../Components/CommonComponent/Loader/Loader";
import View from "../../../Components/CommonComponent/View/View";
import {
  useDeleteTargetCompetitionMutation,
  useEditTargetCompetitionMutation,
  useGetAllTargetCompetitionsQuery,
} from "../../../Redux/Slices/SalesSlices/TargetCompetitionApi";

const TargetCompetetionOverview = () => {
  const navigate = useNavigate();
  const {
    data: allTargetCompetitionsData,
    refetch: refetchTargetCompetitions,
    isError: targetCompetitionsError,
    isLoading: targetCompetitionsLoading,
  } = useGetAllTargetCompetitionsQuery();

  const [deleteTargetCompetition, { isLoading: deleting }] =
    useDeleteTargetCompetitionMutation();

  const [
    updateTargetCompetition,
    { isLoading: paymentUpdating, isError: paymentUpdateError },
  ] = useEditTargetCompetitionMutation();

  const handleDelete = async (id) => {
    try {
      await deleteTargetCompetition(id).unwrap();
      toastAlert("Booking Deleted Successfully");
      refetchTargetCompetitions();
    } catch (error) {
      toastError("Error deleting target competition", error);
    }
  };

  const handleUpdateStatus = async (row) => {
    try {
      await updateTargetCompetition({
        id: row._id,
        status: Number(!row.status),
      }).unwrap();
      toastAlert("Status changed successfully");
      refetchTargetCompetitions();
    } catch (error) {
      toastError(error.message);
    }
  };

  const LinkButtons = [
    {
      name: "Add Target Competition",

      type: "button",
      access: [1, 4],
      onClick: () => navigate("/sales/create-target-competition"),
    },
  ];

  const columns = [
    {
      name: "S.No",
      renderRowCell: (row, index) => index + 1,
      width: 50,
    },
    {
      key: "competition_name",
      width: 200,
      name: "Competition Name",
    },
    {
      key: "target_amount",
      width: 150,
      name: "Target Amount",
      renderRowCell: (row) => formatIndianNumber(row?.target_amount),
    },
    {
      key: "start_date",
      width: 150,
      name: "Start Date",
      renderRowCell: (row) => DateISOtoNormal(row.start_date),
    },
    {
      key: "end_date",
      width: 150,
      name: "End Date",
      renderRowCell: (row) => DateISOtoNormal(row.end_date),
    },
    {
      key: "status",
      name: "Status",
      renderRowCell: (row, index) => {

        if (row.status == 0) {
          return (
            <div
              className="badge danger"
              onClick={() => handleUpdateStatus(row)}
            >
              Inactive
            </div>
          );
        } else {
          return (
            <div
              className="badge success"
              onClick={() => handleUpdateStatus(row)}
            >
              Active
            </div>
          );
        }
      },
    },
    {
      name: "Actions",
      renderRowCell: (row) => (
        <div className="flexCenter colGap12">
          <Link to={`/sales/create-target-competition/${row._id}`}>
            <button className="iconBtn sm" title="Edit">
              <i className="bi bi-pencil" />
            </button>
          </Link>
          <button
            className="iconBtn sm"
            onClick={() => handleDelete(row._id)}
            title="Delete"
          >
            <i className="bi bi-trash" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {paymentUpdating && <Loader />}

      <FormContainer
        mainTitle="Target Competition"
        link="/sales"
        submitButton={false}
        LinkButtons={LinkButtons}
      />

      <View
        title={"Target Competition"}
        columns={columns}
        data={allTargetCompetitionsData}
        pagination
        isLoading={targetCompetitionsLoading}
        tableName={"TargetCompetitionOverview"}
      />
    </>
  );
};

export default TargetCompetetionOverview;
