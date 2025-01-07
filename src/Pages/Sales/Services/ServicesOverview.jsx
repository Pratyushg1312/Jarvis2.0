import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useEditSaleServiceMutation,
  useGetAllSaleServiceQuery,
} from "../../../Redux/Slices/SalesSlices/SalesServiceApi";
import { setLoader, toastAlert, toastError } from "../../../Utils/ToastUtil";
import DeleteButton from "../../../Components/CommonComponent/DeleteButton/DeleteButton";
import Loader from "../../../Components/CommonComponent/Loader/Loader";
import PageHeader from "../../../Components/CommonComponent/FormElement/PageHeader";
import Tab from "../../../Components/CommonComponent/Tab/Tab";
import View from "../../../Components/CommonComponent/View/View";
import { Button } from "@mui/material";
import { Copy, Pencil, Trash } from "@phosphor-icons/react";

const tabName = ["Active", "Inactive"];

const ServicesOverview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tableData, setTableData] = useState();
  const [post, setPost] = useState("post");
  const {
    refetch: refetchService,
    data: allSalesService,
    error: allSalesServiceError,
    isLoading: allSalesServiceLoading,
  } = useGetAllSaleServiceQuery();

  const [
    updateSalesService,
    { isLoading: updatingSalesService, isError: updateError },
  ] = useEditSaleServiceMutation();

  const handleUpdateStatus = async (row) => {
    try {
      await updateSalesService({
        id: row._id,
        status: row.status == 0 ? 1 : 0,
      }).unwrap();

      toastAlert("Status changed successfully");
      refetchService();
    } catch (error) {
      toastError(error.message);
    }
  };

  const onTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const filteredService = allSalesService?.filter(
      (item) => item.status == activeTab
    );
    setTableData(filteredService);
  }, [activeTab, allSalesService]);

  const columns = [
    {
      name: "S.no",
      renderRowCell: (row, index) => <div>{index + 1}</div>,
      width: 50,
    },
    {
      key: "service_name",
      width: 550,
      name: "Service Name",
    },
    {
      key: "status",
      name: "Status",
      renderRowCell: (row, index) => {
        if (row.status == 0) {
          return (
            <div class="badge success" onClick={() => handleUpdateStatus(row)}>
              Active
            </div>
          );
        } else {
          return (
            <div class="badge danger" onClick={() => handleUpdateStatus(row)}>
              Inactive
            </div>
          );
        }
      },
      // width: 550,
    },
    {
      width: 150,
      name: "Action",
      renderRowCell: (row) => (
        <>
          <div className="flexCenter colGap8">
            <Link to={`/sales/create-sales-services/${row._id}/${"put"}`}>
              <button className="iconBtn" title="Edit">
                <Pencil />
              </button>
            </Link>

            <Link to={`/sales/create-sales-services/${row._id}/${post}`}>
              <button className="iconBtn" title="Clone">
                <Copy />
              </button>
            </Link>

            <button className="iconBtn">
              <DeleteButton
                endpoint="sales/delete_sale_service_master"
                id={row._id}
                getData={allSalesService}
              />
            </button>
          </div>
        </>
      ),
    },
  ];
  const LinkButtons = useMemo(
    () => [
      {
        link: "/sales/create-sales-services",
        name: "Add Service",
        type: "link",
        access: [1],
      },
      {
        type: "element",
        element: (
          <Tab
            tabName={tabName}
            activeTabindex={activeTab}
            onTabClick={onTabClick}
          />
        ),
        access: [1, 2, 3, 4],
      },
    ],
    [activeTab]
  );
  useCallback(() => {
    setLoader(updatingSalesService);
  }, [updatingSalesService]);
  return (
    <>
      <PageHeader
        mainTitle="Services"
        link="/sales/create-sales-services"
        LinkButtons={LinkButtons}
      />

      <View
        columns={columns}
        data={tableData}
        isLoading={allSalesServiceLoading}
        title="Services Overview"
        pagination
        tableName={"SalesServicesOverview"}
      />
    </>
  );
};

export default ServicesOverview;
