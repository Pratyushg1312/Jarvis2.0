import { Link } from "react-router-dom";

const FormContainer = ({
    mainTitle,
    title,
    uniqueVendorCount,
    totalPendingAmount,
    pendingRequestCount,
    uniqueCustomerCount,
    discardCount,
    discardedRequestCount,
    paidRequestCount,
    totalRequestAmount,
    handleOpenUniqueVendorClick,
    uniqueCustomerInvoiceCount,
    uniqueSalesExecutiveInvoiceCount,
    nonInvcbalanceAmountTotal,
    handleOpenUniqueSalesExecutive,
    totalBalanceAmount,
    link,
    uniqueNonInvoiceCustomerCount,
    uniqueNonInvoiceSalesExecutiveCount,
    balanceAmountPartial,
    balanceAmountInstant,
    tdsDeductedCount,
    tdsDeductionCount,
    partialTDSDeduction,
    instantTDSDeduction,
    // openCount,
    // closeCount,
    // aboutToCloseCount,
    buttonAccess,
    newbutton,
    newbuttonRouting,
    newbuttonName,
    children,
    handleSubmit,
    withInvoiceCount,
    withoutInvoiceCount,
    handleOpenUniqueCustomerClick,
    submitButton = true,
    activeAccordionIndex,
    addNewButtonName,
    accordionButtons = [],
    accIndex,
    onAccordionButtonClick,
    refundAmountTotal,
    balanceAmountTotal,
    requestedAmountTotal,
    pendingCount,
    approvedCount,
    rejectedCount,
    baseAmountTotal,
    campaignAmountTotal,
    nonGstCount,
    invoiceCount,
    nonInvoiceCount,
    totalBaseAmount,
    uniqueVendorPartialCount,
    uniqueVendorsInstantCount,
    pendingAmountPartial,
    pendingAmountInstant,
    pendingInstantcount,
    pendingPartialcount,
    nonGstPartialCount,
    nonGstInstantCount,
    withInvcPartialImage,
    withInvcInstantImage,
    withoutInvcPartialImage,
    incentiveReleasedAmtTotal,
    withoutInvcInstantImage,
    uniqueSalesExecutiveCount,
    pendingApprovalAdditionalTitles = false,
    includeAdditionalTitles = false,
    paymentDoneAdditionalTitles = false,
    gstHoldAdditionalTitles = false,
    tdsDeductionAdditionalTitles = false,
    allTransactionAdditionalTitles = false,
    discardAdditionalTitles = false,
    dashboardAdditionalTitles = false,
    refundReqAdditionalTitles = false,
    saleBookingClosePaymentAdditionalTitles = false,
    invoiceCreatedPaymentAdditionalTitles = false,
    pendingApprovalRefundAdditionalTitles = false,
    balancePaymentAdditionalTitles = false,
    incentivePaymentAdditionalTitles = false,
    saleBookingVerifyPaymentAdditionalTitles = false,
    pendingInvoicePaymentAdditionalTitles = false,
    gstNongstIncentiveReport = false,
    loading = false,
    pendingpaymentRemainder = 0,
    mainTitleRequired = true,
    Titleheadercomponent,
    TitleHeaderComponentDisplay = "none",
}) => {


    return (
        <div>
            {mainTitleRequired && (
                <div className="form-heading">
                    {/* <img className="img-bg" src={titleimg} alt="" width={160} /> */}
                    <div
                        className="form
          _heading_title "
                    >
                        <h2>{mainTitle}</h2>
                        {/* <div className="pack">
              <i className="bi bi-house"></i>{" "}
              {activeLink.slice(1).charAt(0).toUpperCase() +
                activeLink.slice(2)}
            </div> */}
                    </div>
                    {link && buttonAccess && (
                        <div className="form_heading_action d-flex ">
                            <Link to={link}>
                                <button
                                    title={"Add New " + mainTitle}
                                    className={`btn cmnbtn btn_sm btn-primary ${addNewButtonName && "text_button"
                                        }`}
                                >
                                    {/* {addNewButtonName ? addNewButtonName : <FaUserPlus />} */}
                                    {addNewButtonName ? addNewButtonName : "Add"}
                                </button>
                            </Link>
                            {link && newbutton && (
                                <Link to={newbuttonRouting}>
                                    <button
                                        title={"Add " + mainTitle}
                                        className={`btn cmnbtn btn_sm btn-success ${newbuttonName && "text_button"
                                            }`}
                                    >
                                        {/* {newbuttonName ? newbuttonName : <FaUserPlus />} */}
                                        {newbuttonName ? newbuttonName : "Add"}
                                    </button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}
            {!link && (
                <div className="card shadow mb24">
                    <div className="card-header d-flex flex-row align-items-center justify-content-between">
                        {accordionButtons.length === 0 && (
                            <div className="card_header_title tabbtn_header">
                                <h2>{title}</h2>
                            </div>
                        )}
                        <div
                            className="input-component"
                            style={{
                                display: `${TitleHeaderComponentDisplay}`,
                                width: "100%",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                gap: "10px",
                            }}
                        >
                            {Titleheadercomponent}
                        </div>
                        <div
                            className="btn-group w-100"
                            style={{
                                display: `${TitleHeaderComponentDisplay === "none" ? "" : "none"
                                    }`,
                            }}
                        >
                            {accordionButtons.map((buttonName, index) => (
                                <button
                                    key={index}
                                    className={
                                        activeAccordionIndex === index
                                            ? `btn cmnbtn btn-primary`
                                            : "btn cmnbtn btn-outline-primary"
                                    }
                                    onClick={() => onAccordionButtonClick(index)}
                                >
                                    {buttonName}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="thm_form">
                            <form onSubmit={handleSubmit} className="needs-validation">
                                <div className="row">{children}</div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        {accordionButtons.length == 0 && submitButton && (
                                            <button
                                                className="btn cmnbtn btn-primary"
                                                style={{ marginRight: "5px" }}
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        )}

                                        {activeAccordionIndex === accordionButtons.length - 1 &&
                                            submitButton && (
                                                <button
                                                    className={`btn cmnbtn ${loading ? "btn-danger" : "btn-success"
                                                        }`}
                                                    style={{ marginRight: "5px" }}
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Submiting" : "Submit"}
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormContainer;