import React from "react";
import DashboardSidebarLinks from "./DashboardSidebarLinks";
import HumanResourceSidebarLinks from "./HumanResourceSidebarLinks";
import OrganizationSidebrLinks from "./OrganizationSidebrLinks";
import OpertaionSidebarLink from "./OpertaionSidebarLink";
import FinanceSidebarLinks from "./FinanceSidebarLinks";
import InventorySidebarLinks from "./InventorySidebarLinks";
import ComunitySidebarLinks from "./ComunitySidebarLinks";
import UiSideBarLinks from "./UiSideBarLinks";
import SalesSidebarLinks from "./SalesSidebarLinks";
import { useGetUserAuthQuery } from "../../../Redux/Slices/UserSlices/UserApi";
import GetDecodedToken from "../../../Utils/GetDecodedToken";
import { useAuth } from "../../../Context/ApiCaller";

const AuthSideBar = () => {
  const token = GetDecodedToken();
  const auth = useAuth();
  const userID = token.id;
  const RoleId = token.role_id;
  const deptId = token.dept_id;
  const job_type = token.job_type;
  return (
    <>
      <DashboardSidebarLinks />
      <HumanResourceSidebarLinks />
      <OpertaionSidebarLink />
      <FinanceSidebarLinks />
      {/* <OrganizationSidebrLinks /> */}
      <InventorySidebarLinks />
      <SalesSidebarLinks />
      <ComunitySidebarLinks />
      <UiSideBarLinks />
    </>
  );
};

export default AuthSideBar;
