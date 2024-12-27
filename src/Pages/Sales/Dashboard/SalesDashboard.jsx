import {
  Blueprint,
  Invoice,
  Scroll,
  Files,
  FileX,
} from "@phosphor-icons/react";
import Modal from "react-modal";
import View from "../../../Components/CommonComponent/View/View";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import IncentiveRelease from "../../../Components/Sales/CommonComponent/Incentive/IncentiveRelease";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import axios from "axios";
import { baseUrl } from "../../../Config";
import formatString from "../../../Utils/formatString";
import SalesBadges from "../../../Components/Sales/dashboard/SalesBadges";
import Loader from "../../../Components/CommonComponent/Loader/Loader";
import { formatIndianNumber } from "../../../Utils/formatIndianNumber";
import MonthlyWeeklyCard from "../../../Components/Sales/dashboard/MonthlyWeeklyCard";
import TargetCard from "../../../Components/Sales/dashboard/TargetCard";
import { useGetAllTargetCompetitionsQuery } from "../../../Redux/Slices/SalesSlices/TargetCompetitionApi";
import { useGetTotalSaleAmountDateWiseQuery } from "../../../Redux/Slices/SalesSlices/SaleBookingApi";
import {
  useGetBadgesSalesBookingDataQuery,
  useGetSaleBookingGridStatusCountQuery,
  useGetSaleBookingStatusListQuery,
  useGetTop20AccountsQuery,
  useGetWeeklyMonthlyQuarterlyListQuery,
} from "../../../Redux/Slices/SalesSlices/SalesDashboardApi";
import { useGetSalesCategoryListQuery } from "../../../Redux/Slices/SalesSlices/salesCategoryApi";
import CustomSelect from "../../../Components/CommonComponent/FormElement/CustomSelect";
import OutstandingComp from "../../../Components/CommonComponent/Outstanding/OutstandingComp";

const LinkButtons = [
  {
    name: "View POC",
    link: "/sales/point-of-contact",
    type: "link",
    access: [1],
  },
  {
    name: "Sales Report",
    link: "/sales/report-overview",
    type: "link",
    access: [1],
  },
  {
    name: "View Target Competition",
    link: "/sales/target-competition-overview",
    type: "link",
    access: [1, 4],
  },
  {
    name: "Add Account",
    link: "/sales/create-sales-account/0",
    type: "link",
    access: [1, 4],
  },
  {
    name: "Create Sale Booking",
    link: "/sales/create-sales-booking",
    type: "link",
    access: [1, 4],
  },
];

const SalesDashboard = () => {
  const navigate = useNavigate();
  const loginUserId = GetDecodedToken().id;
  const loginUserRole = GetDecodedToken().role_id;
  const [isLoading, setIsLoading] = useState(false);
  const [releaseModal, setReleaseModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [Cat_id, setCat_id] = useState(loginUserRole === 1 ? 1 : null);
  const [laststartDate, setLastStartDate] = useState();
  const [lastendDate, setLastEndDate] = useState();
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();

  const {
    data: top20AccountsData,
    isLoading: top20AccountsLoading,
    isError: top20AccountsError,
  } = useGetTop20AccountsQuery({
    userId: loginUserId,
    isAdmin: loginUserRole == 1,
  });

  const {
    data: weekMonthCard,
    isLoading: weekMonthCardLoading,
    isError: weekMonthCardError,
  } = useGetWeeklyMonthlyQuarterlyListQuery({
    userId: loginUserId,
    isAdmin: loginUserRole == 1,
    Cat_id,
    startdate,
    enddate,
    laststartDate,
    lastendDate,
  });
  const {
    data: userBadgeData,
    isLoading: userBadgeDataLoading,
    isError: userBadgeDataError,
  } = useGetBadgesSalesBookingDataQuery({ userId: loginUserId });
  const {
    data: salesBookingGridStat,
    isLoading: salesBookingGridStatLoading,
    isError: salesBookingGridStatError,
  } = useGetSaleBookingGridStatusCountQuery();
  const {
    data: salesBookingStat,
    isLoading: salesBookingStatLoading,
    isError: salesBookingStatError,
  } = useGetSaleBookingStatusListQuery();

  const {
    data: allTargetCompetitionsData,
    refetch: refetchTargetCompetitions,
    isError: targetCompetitionsError,
    isLoading: targetCompetitionsLoading,
  } = useGetAllTargetCompetitionsQuery();

  const {
    data: categoryDetails,
    error: categoryDetailsError,
    isLoading: categoryDetailsLoading,
  } = useGetSalesCategoryListQuery({ skip: loginUserRole !== 1 });

  useEffect(() => {
    if (!targetCompetitionsLoading && allTargetCompetitionsData) {
      const activeCompetitions = allTargetCompetitionsData?.filter(
        (competition) => competition.status == 1
      );

      if (activeCompetitions?.length > 0) {
        const formattedStartDate =
          activeCompetitions[0].start_date?.split("T")[0];
        const formattedEndDate = activeCompetitions[0].end_date?.split("T")[0];

        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
      }
    }
  }, [targetCompetitionsLoading, allTargetCompetitionsData]); // Add loading check in the dependency

  const { data: totalSaleAmountDateWise, isError: totalSaleAmountError } =
    useGetTotalSaleAmountDateWiseQuery(
      { startDate, endDate },
      { skip: !startDate || !endDate }
    );

  const getData = (startDate, endDate, laststartDate, lastendDate) => {
    // if (startDate && endDate && laststartDate && lastendDate) {
    setStartdate(startDate);
    setEnddate(endDate);

    setLastStartDate(laststartDate);
    setLastEndDate(lastendDate);
    // }
  };

  const booking = [
    {
      key: "s.no",
      name: "S.No",
      renderRowCell: (row, index) => {
        return index + 1;
      },
      width: 70,
    },
    {
      key: "status",
      name: "Status",
      width: 150,
    },
    {
      key: "discription",
      name: "Description",
      width: 150,
    },
  ];
  const bookingGrid = [
    {
      key: "s.no",
      name: "S.No",
      renderRowCell: (row, index) => {
        return index + 1;
      },
      width: 70,
    },
    {
      key: "booking_status",
      name: "Booking Status",
      width: 150,
    },
    {
      key: "totalSaleBookingCounts",
      name: "Total Sale Booking Counts",
      renderRowCell: (row) => {
        return (
          <div
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() =>
              navigate("/sales/closed-deal", {
                state: { booking_status: row.booking_status },
              })
            }
          >
            {row.totalSaleBookingCounts}
          </div>
        );
      },
      width: 150,
    },
  ];
  const columns = [
    {
      name: "S.No",
      renderRowCell: (row, index) => {
        return index + 1;
      },
      width: 50,
    },
    {
      key: "account_name",
      name: "Account Name",
      renderRowCell: (row) => (
        <Link
          style={{ color: "blue" }}
          to={`/sales/account-info/${row?.account_obj_id}`}
        >
          {formatString(row?.account_name)}
        </Link>
      ),
      width: 150,
    },
    // {
    //   key: "created_by_name",
    //   name: "Created By",
    //   renderRowCell: (row) => row.created_by_name,
    //   width: 150,
    // },
    // {
    //   key: "created_by_contact_no",
    //   name: "Created By Contact Number",
    //   renderRowCell: (row) => row.created_by_contact_no,
    //   width: 150,
    // },
    {
      key: "totalCampaignAmount",
      name: "Total Campaign Amount",
      renderRowCell: (row) => formatIndianNumber(row.totalCampaignAmount),
      width: 150,
    },
    {
      key: "totalSaleBookingCounts",
      name: "Total Sale Booking Counts",
      width: 150,
    },
  ];

  return (
    <div>
      {isLoading && <Loader />}
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

      <FormContainer
        mainTitle={"Dashboard"}
        link={true}
        LinkButtons={LinkButtons}
      />

      {loginUserRole === 1 && categoryDetails && (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Filter By Category</h5>
          </div>
          <div className="row pl-3">
            <CustomSelect
              fieldGrid={4}
              dataArray={[...categoryDetails]?.reverse()}
              optionId="sales_category_id"
              optionLabel="sales_category_name"
              selectedId={Cat_id}
              setSelectedId={setCat_id}
            />
          </div>
        </div>
      )}
      {!weekMonthCardLoading && (
        <>
          <div className="row mt20">
            <MonthlyWeeklyCard
              data={weekMonthCard?.weeklyData}
              previousData={weekMonthCard?.lastWeekData}
              title="Weekly"
              cardclassName="primary"
              titleclassName="colorPrimary"
              colorclassName="primary"
            />

            <MonthlyWeeklyCard
              data={weekMonthCard?.monthlyData}
              previousData={weekMonthCard?.lastMonthData}
              title="Monthly"
              cardclassName="secondary"
              titleclassName="colorSecondary"
              colorclassName="secondary"
              getData={getData}
              loading={weekMonthCardLoading}
            />

            <MonthlyWeeklyCard
              data={weekMonthCard?.quarterlyData}
              previousData={weekMonthCard?.lastQuarterData}
              title="Quarterly"
              cardclassName="tertiary"
              titleclassName="colorTertiary"
              colorclassName="tertiary"
            />
          </div>
          <div className="row mt20">
            <MonthlyWeeklyCard
              data={weekMonthCard?.halfYearlyData}
              previousData={weekMonthCard?.lastHalfYearData}
              title="Half Yearly"
              cardclassName="bgTertiary"
              titleclassName="colorTertiary"
              colorclassName="bgTertiary"
            />
            <MonthlyWeeklyCard
              data={weekMonthCard?.yearlyData}
              previousData={weekMonthCard?.lastYearData}
              title="Yearly"
              cardclassName="bgTertiary"
              titleclassName="colorTertiary"
              colorclassName="bgTertiary"
            />
            <MonthlyWeeklyCard
              data={weekMonthCard?.totalData}
              previousData={weekMonthCard?.Last}
              title="Total"
              cardclassName="bgTertiary"
              titleclassName="colorTertiary"
              colorclassName="bgTertiary"
            />
          </div>
        </>
      )}

      <div className="row">
        <div className="col">
          <NavLink to="/sales/incentive-plan-overview">
            <div className="card">
              <div className="flexCenter flex-column rowGap12 p20">
                <div className="icon primary">
                  <Blueprint />
                </div>
                <div>
                  <h6>Incentive Plan</h6>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col">
          <NavLink to="/sales/invoice-request-overview">
            <div className="card">
              <div className="flexCenter flex-column rowGap12 p20">
                <div className="icon secondary">
                  <Invoice />
                </div>
                <div>
                  <h6>Invoice Request List</h6>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
        {loginUserRole === 1 && (
          <div className="col">
            <NavLink to="/sales/incentive-settlement-overview">
              <div className="card">
                <div className="flexCenter flex-column rowGap12 p20">
                  <div className="icon tertiary">
                    <Scroll />
                  </div>
                  <div>
                    <h6>Incentive Settlement</h6>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        )}
        {loginUserRole !== 4 && (
          <div className="col">
            <NavLink to="https://forms.gle/jz7d66xRpska5fWU9">
              <div className="card">
                <div className="flexCenter flex-column rowGap12 p20">
                  <div className="icon success">
                    <Files />
                  </div>
                  <div>
                    <h6>Request Plan</h6>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        )}
        {loginUserRole === 1 && (
          <div className="col">
            <NavLink to="/sales/deleted-sales-booking">
              <div className="card">
                <div className="flexCenter flex-column rowGap12 p20">
                  <div className="icon danger">
                    <FileX />
                  </div>
                  <div>
                    <h6>Deleted Sale Booking</h6>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        )}
      </div>

      {allTargetCompetitionsData?.map(
        (data, index) =>
          data?.status == 1 && (
            <TargetCard
              index={index}
              data={data}
              totalSaleAmountDateWise={totalSaleAmountDateWise}
              key={data?._id}
            />
          )
      )}

      {/* {loginUserRole == 1 && <SalesBadges userBadgeData={userBadgeData} />} */}

      {loginUserRole == 1 && (
        <>
          <OutstandingComp />
          <View
            title={"Sales Booking Status Grid"}
            data={salesBookingGridStat}
            columns={bookingGrid}
            isLoading={isLoading}
            pagination
            tableName={"Sales Booking Status Grid on dashboard"}
          />
          <View
            title={"Sales Booking Status"}
            data={salesBookingStat}
            columns={booking}
            isLoading={isLoading}
            pagination
            tableName={"Sales Booking Statuson dashboard"}
          />
          <View
            title={"Top Bookings"}
            data={top20AccountsData}
            columns={columns}
            isLoading={isLoading}
            pagination={[10]}
            tableName={"Top 20 Account Campaign Amount Wise"}
          />
        </>
      )}
    </div>
  );
};

export default SalesDashboard;
