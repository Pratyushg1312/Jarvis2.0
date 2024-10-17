import React from "react";
import { useNavigate } from "react-router-dom";
import DateISOtoNormal from "../../../Utils/DateISOtoNormal";
import { formatIndianNumber } from "../../../Utils/formatIndianNumber";
import { formatNumber } from "../../../Utils/formatNumber";
import { CalendarDots } from "@phosphor-icons/react";

const MonthlyWeeklyCard = ({
  data,
  title,
  previousData,
  colorClass = "primary",
}) => {
  const navigate = useNavigate();

  const handleNavigate = (start, end) => {
    navigate("/sales/salesbooking-overview", { state: { start, end } });
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
            <h6 className="colorMedium">
              {DateISOtoNormal(data?.startDate)} to{" "}
              {DateISOtoNormal(data?.endDate)}
            </h6>
          </div>
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
              <h6>{data?.totalSaleBookingCounts}</h6>
              {renderGrowthBadge(
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
              <h6>{formatIndianNumber(data?.totalCampaignAmount)}</h6>
              {renderGrowthBadge(
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
