import React from "react";
import { useNavigate } from "react-router-dom";
import DateISOtoNormal from "../../../utils/DateISOtoNormal";
import { formatIndianNumber } from "../../../utils/formatIndianNumber";
import { formatNumber } from "../../../Utils/formatNumber";

const MonthlyWeeklyCard = ({
    data,
    title,
    previousData,
    titleClass = "colorPrimary",
    colorClass = "bgPrimary",
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
            <div className={`timeDataCard card `}>
                <div className="card-header">
                    <div className="titleCard">
                        <div className={`titleCardImg ${colorClass} border-0`}>
                            <i className="bi bi-calendar4-week"></i>
                        </div>
                        <div className="titleCardText">
                            <h2 className={titleClass}>{title}</h2>
                            <h3>
                                {DateISOtoNormal(data?.startDate)} to{" "}
                                {DateISOtoNormal(data?.endDate)}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="timeDataCardInfo">
                        <ul>
                            <li>
                                <span>Accounts</span>
                                {data?.totalAccountCounts}
                            </li>
                            <li
                                className="pointer"
                                onClick={() => handleNavigate(data?.startDate, data?.endDate)}
                            >
                                <span>Sales</span> {data?.totalSaleBookingCounts}
                                {renderGrowthBadge(
                                    data?.totalSaleBookingCounts,
                                    previousData?.totalSaleBookingCounts
                                )}
                            </li>
                            <li
                                className="pointer"
                                onClick={() => handleNavigate(data?.startDate, data?.endDate)}
                            >
                                <span>Booking Amount</span>{" "}
                                {formatIndianNumber(data?.totalCampaignAmount)}
                                {renderGrowthBadge(
                                    data?.totalCampaignAmount,
                                    previousData?.totalCampaignAmount
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyWeeklyCard;