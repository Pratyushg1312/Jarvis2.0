import React, { useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { formatIndianNumber } from "../../../Utils/formatIndianNumber";
import { formatNumber } from "../../../Utils/formatNumber";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import View from "../../CommonComponent/View/View";

const TargetCard = ({ data, totalSaleAmountDateWise, index }) => {
  const loginUserRole = GetDecodedToken().role_id;
  const finalTargetAmount = data?.target_amount || 0;
  const currentSaleAmount =
    Array.isArray(totalSaleAmountDateWise) && totalSaleAmountDateWise.length > 0
      ? totalSaleAmountDateWise[0]?.totalCampaignAmount
      : 0;
  const columns = [
    {
      key: "S.no",
      name: "S.no",
      renderRowCell: (row, index) => index + 1,
      width: 70,
    },
    { key: "campaignAmount", name: "Sales Amount", width: 200 },
    { key: "sales_executive_name", name: "Sales Executive Name", width: 200 },
    {
      key: "totalSaleBookingCounts",
      name: "Total Sale Booking Counts",
      width: 200,
    },
    {
      key: "Contribution",
      name: "Contribution",
      renderRowCell: (row) => {
        return `${((row.campaignAmount / finalTargetAmount) * 100).toFixed(
          2
        )}%`;
      },
      width: 200,
      compare: true,
    },
  ];

  function updateProgress(percent) {
    document.documentElement.style.setProperty(
      "--LinearProgress-percent",
      percent
    );
  }

  useEffect(() => {
    updateProgress((currentSaleAmount / finalTargetAmount) * 100);
  }, [currentSaleAmount, finalTargetAmount]);

  return (
    <div className="row" key={`mdsnckjnk${index}`}>
      <div className="col-12">
        <div className="card cardAccordion target-card">
          <div className="card-header">
            <div className="cardHeading">
              <h5 className="cardTitle">{data?.competition_name || "N/A"}</h5>
            </div>
          </div>
          <Accordion>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <div className="card-body">
                <div className="saletargetWrapper">
                  {loginUserRole === 1 && (
                    <div className="saletargetHead" key={"bsdkbckdchj"}>
                      <h5>
                        Current sale -{" "}
                        <span className="mediumText">
                          ₹ {formatIndianNumber(Math.ceil(currentSaleAmount))}{" "}
                          {`(₹ ${formatNumber(currentSaleAmount)})`}
                        </span>
                      </h5>

                      <h5>
                        Target -{" "}
                        <span className="warningText">
                          ₹ {formatIndianNumber(finalTargetAmount)}{" "}
                          {`(₹ ${formatNumber(finalTargetAmount)})`}
                        </span>
                      </h5>
                    </div>
                  )}
                  <div className="saletargetHead" key={"nvasjkwecuvwd"}>
                    <h5>
                      Completed:{" "}
                      <span>
                        {(
                          (currentSaleAmount / finalTargetAmount) *
                          100
                        ).toFixed(2)}{" "}
                        %
                      </span>
                    </h5>
                    <h5>
                      Remaining:{" "}
                      <span>
                        {(
                          100 -
                          (currentSaleAmount / finalTargetAmount) * 100
                        ).toFixed(2)}{" "}
                        %
                      </span>
                    </h5>
                  </div>

                  <div className="saletargetBar">
                    <div className="targetflag">
                      <img src={"/assets/images/others/flag.png"} alt="Home" />
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={(currentSaleAmount / finalTargetAmount) * 100}
                    />
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <View
                columns={columns}
                data={totalSaleAmountDateWise?.[0]?.userWiseData}
                pagination
                title={"Sales User Contribution"}
                tableName={"Sales User Contribution in dashboard"}
                isLoading={false}
              />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

function buttonTab(key) {
  return (
    <div className="icon-1">
      <i className="bi bi-trash"></i>
    </div>
  );
}

export default TargetCard;
