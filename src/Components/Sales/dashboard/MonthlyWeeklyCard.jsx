import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateISOtoNormal from "../../../Utils/DateISOtoNormal";
import { formatIndianNumber } from "../../../Utils/formatIndianNumber";
import { formatNumber } from "../../../Utils/formatNumber";
import { CalendarDots } from "@phosphor-icons/react";
import GetDecodedToken from "../../../Utils/GetDecodedToken";

const MonthlyWeeklyCard = ({
  data,
  title,
  previousData,
  colorClass = "primary",
  getData,
  loading,
}) => {
  let loginUserRole = GetDecodedToken().role_id;
  const navigate = useNavigate();
  const [slectedOption, SetSelectedOption] = useState("");
  const [Options, SetOption] = useState([]);

  let startDate = useRef(null);
  let endDate = useRef(null);
  let laststartDate = useRef(null);
  let lastendDate = useRef(null);

  useEffect(() => {
    function getPastMonths() {
      const curr = new Date();
      const currStart = new Date(curr.getFullYear(), curr.getMonth(), 1);

      const months = [];

      for (let i = 0; i < 5; i++) {
        const pastMonthStart = new Date(currStart);
        pastMonthStart.setMonth(pastMonthStart.getMonth() - i);
        pastMonthStart.setDate(1);

        const pastMonthEnd = new Date(pastMonthStart);
        pastMonthEnd.setMonth(pastMonthEnd.getMonth() + 1);
        pastMonthEnd.setDate(0);

        const monthName = pastMonthStart.toLocaleString("default", {
          month: "long",
        });

        months.push({
          month: monthName,
          startdate: new Date(
            pastMonthStart.getTime() -
              pastMonthStart.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0],
          enddate: new Date(
            pastMonthEnd.getTime() - pastMonthEnd.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0],
        });
      }

      return months;
    }
    if (data && title === "Monthly") SetOption(getPastMonths());
  }, [data]);

  useEffect(() => {
    if (slectedOption) {
      const selectedOptionData = Options.find(
        (option) => option.month === slectedOption
      );

      startDate.current = selectedOptionData?.startdate;
      endDate.current = selectedOptionData?.enddate;

      const nextOptionData = Options[Options.indexOf(selectedOptionData) + 1];
      laststartDate.current = nextOptionData?.startdate;
      lastendDate.current = nextOptionData?.enddate;
    }
  }, [slectedOption]);

  useEffect(() => {
    if (slectedOption && title === "Monthly") {
      console.log("getData");
      getData(
        startDate.current,
        endDate.current,
        laststartDate.current,
        lastendDate.current
      );
    }
  }, [slectedOption]);
  // console.log("startDate", startDate.current);
  // console.log("endDate", endDate.current);
  // console.log("laststartDate", laststartDate.current);
  // console.log("lastendDate", lastendDate.current);

  const handleNavigate = (start, end) => {
    navigate("/sales/closed-deal", { state: { start, end } });
  };

  const calculateDifference = (current, previous) => {
    return (previous || 0) - (current || 0);
  };

  const getGrowthBadgeClass = (current, previous) => {
    const difference = calculateDifference(current, previous);
    if (difference == 0) return "growthBlank";
    return difference > 0 ? "growthDown" : "growthUp";
  };

  const renderGrowthBadge = (current, previous) => {
    const difference = calculateDifference(current, previous);
    const badgeClass = getGrowthBadgeClass(current, previous);
    return (
      <div className={`growthBadge ${badgeClass}`}>
        {badgeClass !== "growthBlank" && <span></span>}
        {formatNumber(Math.abs(difference))}
      </div>
    );
  };
  return (
    <div className={`col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12`}>
      <div className="card">
        <div className="flexCenter colGap12 p20 border-bottom">
          <div className={`icon large ${colorClass}`}>
            <CalendarDots />
          </div>
          <div>
            <h4 className="fw_500 mb4">{title}</h4>
            {title === "Monthly" ? (
              <select
                className="cardSelect"
                value={slectedOption}
                onChange={(e) => {
                  SetSelectedOption(e.target.value);
                }}
              >
                {Options.slice(0, 4).map((option, index) => (
                  <option key={index} value={option.month}>
                    {option.month}
                  </option>
                ))}
              </select>
            ) : (
              <h6 className="colorMedium">
                {DateISOtoNormal(data?.startDate)} to{" "}
                {DateISOtoNormal(data?.endDate)}
              </h6>
            )}
          </div>
          {/* {title == "Monthly" && loading && (
            <div class="spinner-border text-primary  " role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )} */}
        </div>
        <div className="d-flex flex-column rowGap16 p20">
          <div className="flexCenterBetween pointer">
            <h6>Accounts</h6>
            <div className="flexCenter colGap12">
              <h6>{data?.totalAccountCounts}</h6>
            </div>
          </div>
          <div
            className="flexCenterBetween pointer"
            onClick={() => handleNavigate(data?.startDate, data?.endDate)}
          >
            <h6>Sales</h6>
            <div className="flexCenter colGap12">
              <h6>
                {data?.totalSaleBookingCounts
                  ? data?.totalSaleBookingCounts
                  : ""}
              </h6>
              {title !== "Total" &&
                renderGrowthBadge(
                  data?.totalSaleBookingCounts,
                  previousData?.totalSaleBookingCounts
                )}
            </div>
          </div>
          <div
            className="flexCenterBetween pointer"
            onClick={() => handleNavigate(data?.startDate, data?.endDate)}
          >
            <h6>Booking Amount</h6>
            <div className="flexCenter colGap12">
              <h6>
                {data?.totalCampaignAmount
                  ? formatIndianNumber(Number(data?.totalCampaignAmount))
                  : ""}
              </h6>
              {title !== "Total" &&
                renderGrowthBadge(
                  data?.totalCampaignAmount,
                  previousData?.totalCampaignAmount
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyWeeklyCard;
