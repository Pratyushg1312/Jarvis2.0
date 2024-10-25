import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Blueprint,
  Invoice,
  Scroll,
  CurrencyDollar,
  CoinVertical,
  CheckSquare,
} from "@phosphor-icons/react";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import View from "../../../Components/CommonComponent/View/View";
import { useGetIncentiveMonthWiseQuery, useGetReleaseButtonStatusQuery, useIncentiveCalculationDashboardMutation, useIncentiveReleaseMutation } from "../../../Redux/Slices/SalesSlices/UserIncentiveDashboardApi";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";

const UserIncentive = () => {
  const token = GetDecodedToken();

  let loginUserId;
  const loginUserRole = token.role_id;

  loginUserId = token.id;
  let userData = useLocation().state || {};

  if (!userData.id) {
    userData = {
      ...userData,

      name: "monthwise",
      id: loginUserId,
    };
  }
  const Navigate = useNavigate();

  const [userIncentiveData, setUserIncentiveData] = useState();
  const [buttonView, setButtonView] = useState();
  const [disabledstate, setDisabledState] = useState(false);


  const { data: monthWiseData, isLoading: isMonthWiseDataLoading } = useGetIncentiveMonthWiseQuery(userData.id, {
    skip: userData.name !== "monthwise",
  });

  const [incentiveCalculationDashboard] = useIncentiveCalculationDashboardMutation();
  const { data: releaseButtonConditionData, isLoading: releaseButtonConditionLoading } = useGetReleaseButtonStatusQuery(userData.id, {
    skip: userData.name !== "monthwise",
  });


  const [incentiveRelease] = useIncentiveReleaseMutation();

  useEffect(() => {
    const fetchData = async () => {
      if (userData.name === "monthwise") {
        try {
          const incentiveCalcResponse = await incentiveCalculationDashboard({ userId: userData.id }).unwrap();


          setUserIncentiveData(incentiveCalcResponse.data[0]);

        } catch (error) {
          console.error("Error fetching incentive data:", error);
        }
      }
    };
    fetchData();
  }, [userData.id, releaseButtonConditionData, incentiveCalculationDashboard]);

  useEffect(() => {
    if (
      buttonView == 0 &&
      userIncentiveData?.totalIncentiveRequestPendingAmount == 0
    ) {
      setDisabledState(true);
    }
    if (
      buttonView != 0 &&
      userIncentiveData?.totalIncentiveRequestPendingAmount > 0
    ) {
      setDisabledState(false);
    }
    if (
      buttonView != 0 &&
      userIncentiveData?.totalIncentiveRequestPendingAmount != 0
    ) {
      setDisabledState(true);
    }
    if (
      buttonView == 0 &&
      userIncentiveData?.totalIncentiveRequestPendingAmount > 0
    ) {
      setDisabledState(false);
    }
  }, [buttonView, userIncentiveData]);



  useEffect(() => {

    if (releaseButtonConditionData) {
      const count = Object.keys(releaseButtonConditionData)?.length;
      setButtonView(count);
    }
  }, [releaseButtonConditionData]);


  const handleRelease = async (e) => {
    e.preventDefault();
    try {
      await incentiveRelease({
        sales_executive_id: userData.id,
        created_by: loginUserId,
        user_requested_amount: userIncentiveData?.totalIncentiveRequestPendingAmount || 0,
      }).unwrap();
      toastAlert("Released Successfully");
    } catch (error) {
      toastError("Failed to release incentive");
      console.error("Error in release:", error);
    }
  };

  const LinkButtons = useMemo(() => [{
    type: "button",
    name: "Release",
    onClick: () => handleRelease,
    access: [1, 4],
    title: () => {
      return disabledstate &&
        releaseButtonConditionData?.finance_status === "pending"
        ? "Pending from finance side"
        : ""
    },
    disabled: () => disabledstate,
    color: "primary",
    variant: "contained",
  }], [releaseButtonConditionData, disabledstate]);


  const columns = [
    {
      key: "s.no",
      name: "S.No",
      width: 50,
      renderRowCell: (row, index) => index + 1,
    },
  ];
  if (userData.name === "monthwise") {
    const monthwise = [
      {
        key: "month",
        name: "Month Year",
        width: 100,
        renderRowCell: (row) => row.monthYear,
        compare: true,
      },
      {
        key: "balanceAmount",
        name: "Balance Amount",
        width: 100,
        renderRowCell: (row) => row.balanceAmount.toFixed(2),
      },
      {
        key: "campaignAmount",
        name: "Campaign Amount",
        width: 100,
        renderRowCell: (row) => row.campaignAmount.toFixed(2),
      },
      {
        key: "earnedIncentiveAmount",
        name: "Earned Incentive Amount",
        width: 100,
        renderRowCell: (row) => (
          <div
            className="hov-pointer"
            onClick={() =>
              Navigate("/admin/incentive-status/earned", {
                state: {
                  name: "Earned",
                  id: userData.id,
                  month: row.monthYear,
                  status: "earned",
                  flag: 0,
                },
              })
            }
          >
            {row.earnedIncentiveAmount.toFixed(2)}{" "}
          </div>
        ),
      },
      {
        key: "incentiveAmount",
        name: "Incentive Amount",
        width: "100",
        renderRowCell: (row) => row.incentiveAmount.toFixed(2),
      },
      {
        key: "paidAmount",
        name: "Paid Amount",
        width: "100",
        renderRowCell: (row) => row.paidAmount.toFixed(2),
      },
      {
        key: "recordServiceAmount",
        name: "Record Service Amount",
        width: "100",
        renderRowCell: (row) => row.recordServiceAmount,
      },
      {
        key: "totalDocuments",
        name: "Total Documents",
        width: "100",
        renderRowCell: (row) => row.totalDocuments,
      },
      {
        key: "unEarnedIncentiveAmount",
        name: "Unearned Incentive Amount",
        width: "100",
        renderRowCell: (row) => (
          <div
            className="hov-pointer"
            onClick={() =>
              Navigate("/admin/incentive-status/un-earned", {
                state: {
                  name: "Un-Earned",
                  id: userData.id,
                  month: row.monthYear,
                  status: "un-earned",
                  flag: 0,
                },
              })
            }
          >
            {row.unEarnedIncentiveAmount.toFixed(2)}
          </div>
        ),
      },
    ];
    columns.push(...monthwise);
  }
  return (
    <>


      <FormContainer mainTitle={"User Incentive"} link={true} LinkButtons={LinkButtons} />


      <div className="row mt24">
        {loginUserRole === 1 &&
          <>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="card">
                <div className="card-body pb20 flexCenter colGap14">
                  <div className="iconBadge bgPrimaryLight m-0">
                    <span>
                      <Blueprint weight="duotone" />
                    </span>
                  </div>
                  <div>
                    <h6 className="colorMedium">Total Incentive Amount</h6>
                    <h6 className="mt8 fs_16">
                      {userIncentiveData?.totalIncentiveAmount.toFixed(2)}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="card">
                <div className="card-body pb20 flexCenter colGap14">
                  <div className="iconBadge bgSecondaryLight m-0">
                    <span>
                      <CurrencyDollar weight="duotone" />
                    </span>
                  </div>
                  <div>
                    <h6 className="colorMedium">Total Earned Incentive</h6>
                    <h6 className="mt8 fs_16">
                      {userIncentiveData?.totalEarnedIncentiveAmount.toFixed(2)}
                    </h6>
                  </div>
                </div>
              </div>
            </div></>}
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="card-body pb20 flexCenter colGap14">
              <div className="iconBadge bgTertiaryLight m-0">
                <span>
                  <CoinVertical weight="duotone" />
                </span>
              </div>
              <div>
                <h6 className="colorMedium">Total Unearned Incentive</h6>
                <h6 className="mt8 fs_16">
                  {userIncentiveData?.totalUnEarnedIncentiveAmount.toFixed(2)}
                </h6>
              </div>
            </div>
          </div>
        </div>
        {loginUserRole === 1 && <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="card-body pb20 flexCenter colGap14">
              <div className="iconBadge bgSuccessLight m-0">
                <span>
                  <Scroll weight="duotone" />
                </span>
              </div>
              <div>
                <h6 className="colorMedium">Total Release Request</h6>
                <h6 className="mt8 fs_16">
                  {userIncentiveData?.totalIncentiveRequestedAmount.toFixed(
                    2
                  )}
                </h6>
              </div>
            </div>
          </div>
        </div>}
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="card-body pb20 flexCenter colGap14">
              <div className="iconBadge bgInfoLight m-0">
                <span>
                  <Invoice weight="duotone" />
                </span>
              </div>
              <div>
                <h6 className="colorMedium">Total Release Request Pending</h6>
                <h6 className="mt8 fs_16">
                  {userIncentiveData?.totalIncentiveRequestPendingAmount.toFixed(
                    2
                  )}
                </h6>
              </div>
            </div>
          </div>
        </div>
        {loginUserRole === 1 && <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="card">
            <div className="card-body pb20 flexCenter colGap14">
              <div className="iconBadge bgWarningLight m-0">
                <span>
                  <CheckSquare weight="duotone" />
                </span>
              </div>
              <div>
                <h6 className="colorMedium">Total Release Completed</h6>
                <h6 className="mt8 fs_16">
                  {userIncentiveData?.totalIncentiveReleasedAmount.toFixed(2)}
                </h6>
              </div>
            </div>
          </div>
        </div>}
      </div>

      <View
        columns={columns}
        data={monthWiseData?.data?.monthYearWiseIncentiveCalculation}
        title={"User Overview"}
        tableName={"sales-individual-incentive-table"}
        pagination
        isLoading={isMonthWiseDataLoading}
      />

    </>
  );
};


export default UserIncentive;
