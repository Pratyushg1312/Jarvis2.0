import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useEditSaleServiceMutation,
  useGetAllSaleServiceQuery,
} from "../../../Redux/Slices/SalesSlices/SalesServiceApi";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import DeleteButton from "../../../Components/CommonComponent/DeleteButton/DeleteButton";
import Loader from "../../../Components/CommonComponent/Loader/Loader";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import Tab from "../../../Components/CommonComponent/Tab/Tab";
import View from "../../../Components/CommonComponent/View/View";
import { Button } from "@mui/material";

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
            <buton
              className="btn cmnbtn btn_sm btn-success"
              onClick={() => handleUpdateStatus(row)}
            >
              Active
            </buton>
          );
        } else {
          return (
            <buton
              className="btn cmnbtn btn_sm btn-danger"
              onClick={() => handleUpdateStatus(row)}
            >
              Inactive
            </buton>
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
          <div className="flex-row gap-2">


            <Link to={`/sales/create-sales-services/${row._id}/${"put"}`}>
              <Button variant="contained" color="primary" className="dropdown-item ">Edit</Button>
            </Link>

            <Link to={`/sales/create-sales-services/${row._id}/${post}`}>
              <Button variant="contained" color="primary" className="dropdown-item ">Clone</Button>
            </Link>

            <DeleteButton
              endpoint="sales/delete_sale_service_master"
              id={row._id}
              getData={allSalesService}
            />
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
  return (
    <>
      {updatingSalesService && <Loader />}

      <FormContainer
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
