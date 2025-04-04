import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import {
  CardsThree,
  Dresser,
  CurrencyDollar,
  CoinVertical,
  Money,
  X,
} from "@phosphor-icons/react";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import {
  useGetAllSalesUsersQuery,
  useGetIncentiveCalculationwiseQuery,
  useIncentiveCalculationDashboardMutation,
} from "../../../Redux/Slices/SalesSlices/UserIncentiveDashboardApi";
import IncentiveRelease from "../../../Components/Sales/CommonComponent/Incentive/IncentiveRelease";
import PageHeader from "../../../Components/CommonComponent/FormElement/PageHeader";
import { formatNumber } from "../../../Utils/formatNumber";
import CustomSelect from "../../../Components/CommonComponent/FormElement/CustomSelect";
import View from "../../../Components/CommonComponent/View/View";
import { toastError } from "../../../Utils/ToastUtil";
import { Button } from "@mui/material";

const IncentiveDashboard = () => {
  const loginUserId = GetDecodedToken().id;
  const loginUserRole = GetDecodedToken().role_id;
  const [data, setData] = useState([]);
  const [incentiveTotalData, setIncentiveTotalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusWiseData, setStatusWiseData] = useState([]);
  const [statusWiseIsLoading, setStatusWiseIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [salesUserListData, setSalesUserListData] = useState([]);
  const [userListIsLoading, setUserListIsLoading] = useState(false);
  const [selectedYearMonths, setSelectedYearMonths] = useState([]);
  const [releaseModal, setReleaseModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const navigate = useNavigate();
  const {
    data: allSalesUsersData,
    isSuccess: allSalesUsersSuccess,
    isError: allSalesUsersError,
  } = useGetAllSalesUsersQuery();

  const [
    getcalulation,
    {
      data: IncentiveDashboardData,
      error: incentiveCalculationDashboardError,
      isLoading: incentiveCalculationDashboardLoading,
    },
  ] = useIncentiveCalculationDashboardMutation();

  const {
    data: incentiveCalculationData,
    isSuccess: incentiveCalculationSuccess,
    isError: incentiveCalculationError,
  } = useGetIncentiveCalculationwiseQuery();
  async function getData(bodyData) {
    if (!bodyData) {
      bodyData = {
        user_ids: [],
        monthYearArray: [],
      };
    }
    setIsLoading(true);
    try {
      const response = await getcalulation(bodyData);

      if (response.data.data.length === 1) {
        setIncentiveTotalData(response.data.data[0]);
        setData(response.data.data[0]?.userWiseIncentiveCalculation);
      } else {
        setData([]);
        setIncentiveTotalData([]);
      }
    } catch (error) {
      // Handle error if needed
      if (error.message !== "Request failed with status code 404")
        toastError(error.message);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or error
    }
  }

  async function getStatusWiseData() {
    setStatusWiseIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        baseUrl + "sales/incentive_calculation_status_wise_data",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setStatusWiseData(response); // Assuming you want to set the response data
    } catch (error) {
      // Handle error if needed
      if (error.message !== "Request failed with status code 404")
        toastError(error.message);
    } finally {
      setStatusWiseIsLoading(false); // Stop loading regardless of success or error
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const generateYearMonthData = (startYear, endYear) => {
    const months = [
      { id: 1, name: "January" },
      { id: 2, name: "February" },
      { id: 3, name: "March" },
      { id: 4, name: "April" },
      { id: 5, name: "May" },
      { id: 6, name: "June" },
      { id: 7, name: "July" },
      { id: 8, name: "August" },
      { id: 9, name: "September" },
      { id: 10, name: "October" },
      { id: 11, name: "November" },
      { id: 12, name: "December" },
    ];
    const yearMonthData = [];

    for (let year = endYear; year >= startYear; year--) {
      months.forEach((month) => {
        yearMonthData.push({
          id: `${month.id}-${year}`,
          name: `${month.name} ${year}`,
        });
      });
    }

    return yearMonthData;
  };
  const currentYear = new Date().getFullYear();
  const yearMonthDataArray = generateYearMonthData(
    currentYear - 100,
    currentYear
  );

  const handleRelease = async (e, row) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}sales/incentive_request`,
        {
          sales_executive_id: row?.user_id,
          created_by: loginUserId,
          user_requested_amount: row?.incentiveRequestPendingAmount || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toastAlert("Incentive Release Request Created Successfully");
      getData();
      getStatusWiseData();
      getSalesUserList();
    } catch (error) {
      toastError(error);
    }
  };

  const columns = [
    {
      name: "S.No",
      renderRowCell: (row, index) => {
        return index + 1;
      },
      width: 50,
    },
    {
      key: "user_name",
      name: "Sales Executive Name",
      renderRowCell: (row) => (
        <>
          <div
            className="pointer colorPrimary"
            onClick={() =>
              navigate(`/sales/user-incentive`, {
                state: { id: row.user_id, name: "monthwise" },
              })
            }
          >
            {row.user_name}
          </div>
        </>
      ),
      width: 150,
    },
    {
      key: "recordServiceAmount",
      name: "Record Service Amount",
      renderRowCell: (row) => (
        <>
          <div
            className="pointer colorPrimary"
            onClick={() =>
              navigate(`/sales/user-incentive`, {
                state: { id: row.user_id, name: "monthwise" },
              })
            }
          >
            {row.recordServiceAmount}
          </div>
        </>
      ),
      width: 150,
    },
    {
      key: "incentiveAmount",
      name: "Incentive Amount",
      width: 150,
      renderRowCell: (row) => (
        <>
          <div
            className="pointer colorPrimary"
            onClick={() =>
              navigate(`/sales/user-incentive`, {
                state: { id: row.user_id, name: "monthwise" },
              })
            }
          >
            {row.incentiveAmount.toFixed(2)}
          </div>
        </>
      ),
    },
    {
      key: "campaignAmount",
      name: "Campaign Amount",
      renderRowCell: (row) => (
        <>
          <div
            className="pointer colorPrimary"
            onClick={() =>
              navigate(`/sales/user-incentive`, {
                state: { id: row.user_id, name: "monthwise" },
              })
            }
          >
            {row.campaignAmount}
          </div>
        </>
      ),
      width: 150,
    },
    {
      key: "earnedIncentiveAmount",
      name: "Earned",
      renderRowCell: (row) => (
        <>
          <div
            className="pointer colorPrimary"
            onClick={() =>
              navigate("/sales/incentive-status/earned", {
                state: {
                  name: "Earned",
                  id: row.user_id,
                  status: "earned",
                  flag: 1,
                },
              })
            }
          >
            {row.earnedIncentiveAmount.toFixed(2)}
          </div>
        </>
      ),
      width: 150,
    },
    {
      key: "unEarnedIncentiveAmount",
      name: "Unearned",
      renderRowCell: (row) => (
        <>
          <div
            className="pointer colorPrimary"
            onClick={() =>
              navigate("/sales/incentive-status/earned", {
                state: {
                  name: "Unearned",
                  id: row.user_id,
                  status: "unearned",
                  flag: 1,
                },
              })
            }
          >
            {row.unEarnedIncentiveAmount.toFixed(2)}
          </div>
        </>
      ),
      width: 150,
    },
    {
      key: "paidAmount",
      name: "Paid Amount",
      width: 150,
    },
    {
      key: "incentiveRequestedAmount",
      name: "Incentive Requested Amount",
      renderRowCell: (row) => (
        <div
          className="pointer colorPrimary"
          onClick={() =>
            navigate("/sales/user-incenitve", {
              state: {
                id: row.user_id,
                name: row.user_name,
                type: "requested",
              },
            })
          }
        >
          {row.incentiveRequestedAmount.toFixed(2)}
        </div>
      ),
      width: 150,
    },
    {
      key: "incentiveRequestPendingAmount",
      name: "Incentive Request Pending Amount",
      renderRowCell: (row) => row.incentiveRequestPendingAmount.toFixed(2),
      width: 150,
    },
    {
      key: "Request for Release",
      name: "Request for Release",
      renderRowCell: (row) => {
        let buttonView = row?.incentiveButtonShowCondition?.length;
        let disabledState = false;
        if (buttonView == 0 && row?.incentiveRequestPendingAmount == 0) {
          disabledState = true;
        }
        if (buttonView != 0 && row?.totalIncentiveRequestPendingAmount > 0) {
          disabledState = false;
        }
        if (buttonView != 0 && row?.totalIncentiveRequestPendingAmount != 0) {
          disabledState = true;
        }
        if (buttonView == 0 && row?.totalIncentiveRequestPendingAmount > 0) {
          disabledState = false;
        }
        return (
          <div title={disabledState ? "Release Request Already Pending" : ""}>
            {row?.incentiveRequestPendingAmount > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleRelease(e, row)}
                disabled={disabledState}
              >
                Release
              </Button>
            )}
          </div>
        );
      },
      width: 150,
    },
    {
      key: "incentiveReleasedAmount",
      name: "Incentive Released Amount",
      renderRowCell: (row) => (
        <div
          onClick={() =>
            navigate("/sales/user-incenitve", {
              state: {
                id: row.user_id,
                name: row.user_name,
                type: "released",
              },
            })
          }
        >
          {row.incentiveReleasedAmount.toFixed(2)}
        </div>
      ),

      width: 150,
    },
  ];

  // const handleRelease = (row) => {
  //   setReleaseModal(true);
  //   setSelectedRow(row);
  // };

  return (
    <div>
      <Modal
        className="salesModal"
        isOpen={releaseModal}
        onRequestClose={() => setReleaseModal(false)}
        contentLabel="modal"
        preventScroll={true}
        appElement={document.getElementById("root")}
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            height: "100vh",
          },
          content: {
            position: "absolute",
            maxWidth: "900px",
            top: "50px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
            maxHeight: "650px",
          },
        }}
      >
        <IncentiveRelease
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      </Modal>

      <PageHeader mainTitle={"Incentive Dashboard"} link={true} />

      <div className="row">
        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="p20 flexCenter colGap12">
              <div className="icon large primary">
                <span>
                  <CardsThree weight="duotone" />
                </span>
              </div>
              <div>
                <h6>Total Campaign Amount</h6>
                <h4 className="fw_500 mt4">
                  {formatNumber(incentiveTotalData?.totalCampaignAmount)}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="p20 flexCenter colGap12">
              <div className="icon large secondary">
                <span>
                  <Dresser weight="duotone" />
                </span>
              </div>
              <div>
                <h6>Total Record Service Amount</h6>
                <h4 className="fw_500 mt4">
                  {formatNumber(incentiveTotalData?.totalRecordServiceAmount)}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="p20 flexCenter colGap12">
              <div className="icon large success">
                <span>
                  <CurrencyDollar weight="duotone" />
                </span>
              </div>
              <div>
                <h6>Total Earned</h6>
                <h4 className="fw_500 mt4">
                  {formatNumber(incentiveTotalData?.totalEarnedIncentiveAmount)}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="p20 flexCenter colGap12">
              <div className="icon large info">
                <span>
                  <CoinVertical weight="duotone" />
                </span>
              </div>
              <div>
                <h6>Total Unearned</h6>
                <h4 className="fw_500 mt4">
                  {formatNumber(
                    incentiveTotalData?.totalUnEarnedIncentiveAmount
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="p20 flexCenter colGap12">
              <div className="icon large warning">
                <span>
                  <Money weight="duotone" />
                </span>
              </div>
              <div>
                <h6>Total Paid Amount</h6>
                <h4 className="fw_500 mt4">
                  {formatNumber(incentiveTotalData?.totalPaidAmount)}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="p20 flexCenter colGap12">
              <div className="icon large primary">
                <span>
                  <Money weight="duotone" />
                </span>
              </div>
              <div>
                <h6>Total Release Request Amount</h6>
                <h4 className="fw_500 mt4">
                  {formatNumber(
                    incentiveTotalData?.totalIncentiveRequestedAmount
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="p20 flexCenter colGap12">
              <div className="icon large secondary">
                <span>
                  <Money weight="duotone" />
                </span>
              </div>
              <div>
                <h6>Total Release Request Pending Amount</h6>
                <h4 className="fw_500 mt4">
                  {formatNumber(
                    incentiveTotalData?.totalIncentiveRequestPendingAmount
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="p20 flexCenter colGap12">
              <div className="icon large success">
                <span>
                  <Money weight="duotone" />
                </span>
              </div>
              <div>
                <h6>Total Release Completed Amount</h6>
                <h4 className="fw_500 mt4">
                  {formatNumber(
                    incentiveTotalData?.totalIncentiveReleasedAmount
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <CustomSelect
                label={"User"}
                dataArray={allSalesUsersData}
                optionId={"user_id"}
                optionLabel={"user_name"}
                selectedId={selectedUsers}
                setSelectedId={setSelectedUsers}
                required={false}
                multiple={true}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <CustomSelect
                label={"Year-Month"}
                dataArray={yearMonthDataArray}
                optionId={"id"}
                optionLabel={"name"}
                selectedId={selectedYearMonths} // Ensure this state can handle an array of selections
                setSelectedId={setSelectedYearMonths} // Update this function to handle setting an array
                required={false}
                multiple={true}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="flexCenter colGap12 pt25">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => {
                    let payload = {};
                    if (selectedUsers.length === 0) {
                      payload = { monthYearArray: selectedYearMonths };
                    }
                    if (selectedYearMonths.length === 0) {
                      payload = { user_ids: selectedUsers };
                    }
                    if (
                      selectedUsers.length !== 0 &&
                      selectedYearMonths.length !== 0
                    ) {
                      payload = {
                        user_ids: selectedUsers,
                        monthYearArray: selectedYearMonths,
                      };
                    }

                    getData(payload);
                  }}
                >
                  Search
                </button>
                <button
                  className="iconBtn btn btn-outline-danger"
                  onClick={() => {
                    getData();
                    setSelectedUsers([]);
                    setSelectedYearMonths([]);
                  }}
                >
                  <X />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <View
        title={"Overview"}
        data={data}
        columns={columns}
        isLoading={isLoading}
        pagination
        tableName={"Incentive Overiew Dashboard"}
      />
    </div>
  );
};

export default IncentiveDashboard;
