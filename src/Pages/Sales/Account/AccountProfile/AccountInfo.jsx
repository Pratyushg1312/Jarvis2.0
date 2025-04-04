import React, { useState } from "react";
import logo from "/assets/images/logo/logo.png";
import {
  AddressBook,
  ArrowLeft,
  CashRegister,
  ChartLineUp,
  File,
  Pencil,
} from "@phosphor-icons/react";
import SalesDetail from "./SalesDetail";
import PocDetails from "./PocDetails";
import { useNavigate, useParams } from "react-router-dom";
import DocumentTypDetails from "./DocumentTypDetails";
import SalesBookingDetails from "./SalesBookingDetails";
// import TimelineView from "./TimelineView";
// import PaymentView from "./PaymentView";
import { useGetSingleAccountQuery } from "../../../../Redux/Slices/SalesSlices/SalesAccountApi";

const AccountInfo = () => {
  const [pocCount, setPocCount] = useState(0);
  const [docCount, setDocCount] = useState(0);
  const [salesLength, setSalesLength] = useState(0);
  const account = useParams();
  const navigate = useNavigate();
  const {
    refetch: refetchSingleAccount,
    data: SingleAccount,
    error: SingleAccountErr,
    isLoading: SingleAccountLoading,
  } = useGetSingleAccountQuery(account?.id);

  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="AccountInfo">
      <div className="sales-sidebar">
        <div className="topbarBrand-1">
          <div className="branding">
            <div className="logo-1">
              <img className="logo-img" src={logo} alt="logo" width={40} />
            </div>
            <div className="brandtext">
              Creative <span>fuel</span>
            </div>
          </div>
        </div>
        <div className="navbar-nav sidebar">
          <div className="links">
            <div className="nav-item nav-item-single">
              <div
                className="nav-btn nav-link"
                onClick={() => handleClickScroll("DetailView")}
              >
                <i className="ph">
                  <CashRegister weight="duotone" />
                </i>
                <span>Details</span>
              </div>
            </div>
            <div className="nav-item nav-item-single">
              <div
                className="nav-btn nav-link"
                onClick={() => handleClickScroll("ContactView")}
              >
                <i className="ph">
                  <AddressBook weight="duotone" />
                </i>
                <span>
                  Contacts(POC){" "}
                  <span className="badge primary">{pocCount}</span>
                </span>
              </div>
            </div>
            <div className="nav-item nav-item-single">
              <div
                className="nav-btn nav-link"
                onClick={() => handleClickScroll("SalesView")}
              >
                <i className="ph">
                  <ChartLineUp weight="duotone" />
                </i>
                <span>
                  Sales
                  <span className="badgeNum">{salesLength}</span>
                </span>
              </div>
            </div>
            <div className="nav-item nav-item-single">
              <div
                className="nav-btn nav-link"
                onClick={() => handleClickScroll("DocumentsView")}
              >
                <i className="ph">
                  <File weight="duotone" />
                </i>
                <span>
                  Documents <span className="badgeNum">{docCount}</span>
                </span>
              </div>
            </div>
            {/* <div className="nav-item nav-item-single">
              <div
                className="nav-btn nav-link"
                onClick={() => handleClickScroll("TimelineView")}
              >
                <i className="ph">
                  <File weight="duotone" />
                </i>
                <span>Timeline</span>
              </div>
            </div> */}
            {/* <div className="nav-item nav-item-single">
              <div
                className="nav-btn nav-link"
                onClick={() => handleClickScroll("PaymentView")}
              >
                <i className="ph">
                  <File weight="duotone" />
                </i>
                <span>Payments</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="sales-accountinfo-view">
        <div className="actionNavbar">
          <button className="iconBtn" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <ul>
            <li>
              <a
                className="iconBtn btn-primary"
                onClick={() =>
                  navigate(`/admin/create-sales-account/${SingleAccount?._id}`)
                }
              >
                <Pencil />
              </a>
            </li>
          </ul>
        </div>
        <div className="sales-accountinfo-view-in">
          <section id="DetailView">
            <SalesDetail
              SingleAccount={SingleAccount}
              SingleAccountLoading={SingleAccountLoading}
              refetchSingleAccount={refetchSingleAccount}
            />
          </section>
          <section id="ContactView">
            <PocDetails
              SingleAccount={SingleAccount}
              SingleAccountLoading={SingleAccountLoading}
              setPocCount={setPocCount}
            />
          </section>
          <section id="SalesView">
            <SalesBookingDetails
              SingleAccount={SingleAccount}
              setSalesLength={setSalesLength}
            />
          </section>
          <section id="DocumentsView">
            <DocumentTypDetails
              SingleAccount={SingleAccount}
              SingleAccountLoading={SingleAccountLoading}
              setDocCount={setDocCount}
            />
          </section>
          {/* <section id="TimelineView">
            <TimelineView
              SingleAccount={SingleAccount}
              SingleAccountLoading={SingleAccountLoading}
              setDocCount={setDocCount}
            />
          </section> */}
          {/* <section id="PaymentView">
            <PaymentView
              SingleAccount={SingleAccount}
              SingleAccountLoading={SingleAccountLoading}
              setDocCount={setDocCount}
            />
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
