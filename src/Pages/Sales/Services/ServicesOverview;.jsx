import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEditSaleServiceMutation, useGetAllSaleServiceQuery } from "../../../Redux/Slices/SalesSlices/SalesServiceApi";
import { toastAlert, toastError } from "../../../Utils/ToastUtil";
import DeleteButton from "../../../Components/CommonComponent/DeleteButton/DeleteButton";
import Loader from "../../../Components/CommonComponent/Loader/Loader";
import FormContainer from "../../../Components/CommonComponent/FormElement/FormContainer";
import Tab from "../../../Components/CommonComponent/Tab/Tab";
import View from "../../../Components/CommonComponent/View/View";

const LinkButtons = [
  {
    link: "/sales/create-sales-services",
    name: "Add Service",
    type: "link",
    access: [1],
  },
];
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
            <button
              type="button"
              className=" icon-1 "
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa-solid fa-ellipsis"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to={`/sales/create-sales-services/${row._id}/${"put"}`}>
                <button className="dropdown-item ">Edit</button>
              </Link>

              <Link to={`/sales/create-sales-services/${row._id}/${post}`}>
                <button className="dropdown-item ">Clone</button>
              </Link>
            </div>
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
  return (
    <>
      {updatingSalesService && <Loader />}

      <FormContainer
        mainTitle="Services"
        link="/sales/create-sales-services"
        LinkButtons={LinkButtons}
      />

      <Tab
        tabName={tabName}
        activeTabindex={activeTab}
        onTabClick={onTabClick}
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
