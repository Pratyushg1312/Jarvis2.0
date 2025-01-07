import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetIncentivePlanListQuery } from "../../../Redux/Slices/SalesSlices/IncentivePlanApi";
import { useGetAllSaleServiceQuery } from "../../../Redux/Slices/SalesSlices/SalesServiceApi";
import PageHeader from "../../../Components/CommonComponent/FormElement/PageHeader";
import View from "../../../Components/CommonComponent/View/View";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { useGetUserAuthQuery } from "../../../Redux/Slices/UserSlices/UserApi";
import { Pencil } from "@phosphor-icons/react";

const IncentivePlanOverview = () => {
  const navigate = useNavigate();
  const [incentiveData, setIncentiveData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [search, setSearch] = useState("");
  const token = GetDecodedToken();

  let loginUserId;
  const loginUserRole = token.role_id;
  const { data: userAuthData } = useGetUserAuthQuery(token.id);
  if (userAuthData?.find((data) => data?._id == 64)?.view_value !== 1) {
    loginUserId = token.id;
  }
  const {
    data: allIncentiveData,
    isError: incentiveError,
    isLoading: incentiveLoading,
  } = useGetIncentivePlanListQuery();
  const {
    data: allsalesdata,
    isError: salesError,
    isLoading: salesLoading,
  } = useGetAllSaleServiceQuery();

  useEffect(() => {
    if (allIncentiveData) {
      if (loginUserRole === 1) {
        setIncentiveData(allIncentiveData);
      } else {
        setIncentiveData(
          allIncentiveData.filter(
            (data) => data?.sales_service_master_Data?.status === 0
          )
        );
      }
    }
  }, [allIncentiveData]);

  const LinkButtons = useMemo(
    () => [
      {
        type: "button",
        name: "Create Incentive Plan",
        access: [1],
        onClick: () => navigate("/sales/incentive-plan/create"),
      },
    ],
    [navigate]
  );
  const columns = [
    {
      name: "S.No",
      renderRowCell: (row, index) => <div>{index + 1}</div>,
      width: 50,
      sortable: true,
    },
    {
      key: "sales_service_name",
      name: "Service Name",
      renderRowCell: (row) => row?.sales_service_master_Data?.service_name,
      width: 400,
    },

    {
      key: "value",
      name: "Value (%)",
      renderRowCell: (row) => row.value,
      width: 350,
    },
  ];

  if (loginUserRole == 1) {
    columns.push({
      key: "incentive_type",
      name: "Service Type",
      renderRowCell: (row) => row.incentive_type,
      width: 200,
    });
  }

  if (loginUserRole === 1) {
    columns.push({
      name: "Action",

      renderRowCell: (row) => (
        <div className="flex-row">
          <Link to={`/sales/incentive-plan/${row._id}`}>
            <button className="iconBtn">
              <Pencil />
            </button>
          </Link>
        </div>
      ),
      width: 300,
    });
  }

  return (
    <>
      <PageHeader
        mainTitle={`Incentive Plan`}
        LinkButtons={LinkButtons}
        link={true}
      />

      <View
        title={`Incentive Overview (${
          allIncentiveData?.length
        }) - ${"There will be no incentive for competitive plan"}`}
        data={incentiveData}
        columns={columns}
        isLoading={incentiveLoading || salesLoading}
        pagination={[20]}
        rowSelectable
        tableName={"IncentivePlanOverview"}
      />
    </>
  );
};

export default IncentivePlanOverview;
