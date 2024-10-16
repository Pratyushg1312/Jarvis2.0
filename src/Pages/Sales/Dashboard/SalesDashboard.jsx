import {
  Blueprint,
  Invoice,
  Scroll,
  Files,
  FileX,
  CalendarBlank,
} from "@phosphor-icons/react";
import Modal from "react-modal";
import View from "../../../Components/CommonComponent/View/View";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import GetDecodedToken from "../../../utils/GetDecodedToken";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import IncentiveRelease from "../../../Components/Sales/CommonComponent/Incentive/IncentiveRelease";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import axios from "axios";
import { baseUrl } from "../../../Config";
import formatString from "../../../Utils/formatString";
import SalesBadges from "../../../Components/Sales/dashboard/SalesBadges";
import Loader from "../../../Components/CommonComponent/Loader/Loader";
import { formatIndianNumber } from "../../../utils/formatIndianNumber";
import MonthlyWeeklyCard from "../../../Components/Sales/dashboard/MonthlyWeeklyCard";
import TargetCard from "../../../Components/Sales/dashboard/TargetCard";
import { useGetAllTargetCompetitionsQuery } from "../../../Redux/Slices/SalesSlices/TargetCompetitionApi";
import { useGetTotalSaleAmountDateWiseQuery } from "../../../Redux/Slices/SalesSlices/SaleBookingApi";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const SalesDashboard = () => {
  const navigate = useNavigate();
  const loginUserId = GetDecodedToken().id;
  const loginUserRole = GetDecodedToken().role_id;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [releaseModal, setReleaseModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [weekMonthCard, setWeekMonthCard] = useState();
  const [userBadgeData, setUserBadgeData] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [salesBookingGridStat, setSalesBookingGridStat] = useState();
  const [salesBookingStat, setSalesBookingStat] = useState();

  async function getData() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        baseUrl +
          `sales/top20_account_list?userId=${loginUserId}&isAdmin=${
            loginUserRole == 1
          }`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const response1 = await axios.get(
        baseUrl +
          `sales/weekly_monthly_quarterly_list?userId=${loginUserId}&isAdmin=${
            loginUserRole == 1 ? "true" : "false"
          }`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const responseOutstanding = await axios.get(
        baseUrl + `sales/badges_sales_booking_data?userId=${loginUserId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const salesBookingGridStatus = await axios.get(
        baseUrl + `sales/sale_booking_grid_status_count_list`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const salesBookingStatus = await axios.get(
        baseUrl + `sales/sale_booking_status_list`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setSalesBookingGridStat(salesBookingGridStatus.data.data);
      setSalesBookingStat(salesBookingStatus.data.data);

      setUserBadgeData(responseOutstanding.data.data);
      setWeekMonthCard(response1.data.data);
      setData(response.data.data);
    } catch (error) {
      if (error.message !== "Request failed with status code 404")
        toastError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  const {
    data: allTargetCompetitionsData,
    refetch: refetchTargetCompetitions,
    isError: targetCompetitionsError,
    isLoading: targetCompetitionsLoading,
  } = useGetAllTargetCompetitionsQuery();

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

  useEffect(() => {
    getData();
  }, []);
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
              navigate("/admin/view-sales-booking", {
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
          to={`/sales-account-info/${row?.account_obj_id}`}
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

      <div className="pageHeader">
        <div className="pageTitle">
          <h2>Sales Dashboard</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link>Sales</Link>
            <Typography>Dashboard</Typography>
          </Breadcrumbs>
        </div>
        <div className="pageAction">
          <div className="pageMenu">
            <ul>
              <li>
                <Link href="">View POC</Link>
              </li>
              <li>
                <Link href="">Sales Report</Link>
              </li>
              <li>
                <Link href="">View Target Competition</Link>
              </li>
              <li>
                <Link href="">Add Account</Link>
              </li>
              <li>
                <Link href="">Create Sale Booking</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="action_heading">
        <div className="action_title">
          <FormContainer mainTitle={"Dashboard"} link={true} />
        </div>
        <div className="action_btns">
          {loginUserRole == 1 && (
            <>
              <Link to="/admin/Sales-Point-Of-Contact">
                <button className="btn cmnbtn btn-primary btn_sm">
                  View POC
                </button>
              </Link>
              <Link to="/admin/sales-user-report">
                <button className="btn cmnbtn btn-primary btn_sm">
                  Sales Report
                </button>
              </Link>
            </>
          )}
          <Link to={"/admin/view-target-competition"}>
            <button className="btn cmnbtn btn-primary btn_sm">
              View target competition
            </button>
          </Link>
          <Link to={"/admin/create-sales-account/0"}>
            <button className="btn cmnbtn btn-primary btn_sm">
              Add account
            </button>
          </Link>
          <Link to={"/admin/create-sales-booking"}>
            <button className="btn cmnbtn btn-primary btn_sm">
              Create Sale Booking
            </button>
          </Link>
        </div>
      </div>

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

      <div className="row">
        <div className="col">
          <NavLink to="/admin/sales-incentive-overview">
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
          <NavLink to="/admin/view-invoice-request">
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
            <NavLink to="/admin/sales-incentive-settlement-overview">
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
            <NavLink to="/admin/deleted-sales-booking">
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
            />
          )
      )}

      {loginUserRole == 1 && <SalesBadges userBadgeData={userBadgeData} />}

      {loginUserRole == 1 && (
        <>
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
            data={data}
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
