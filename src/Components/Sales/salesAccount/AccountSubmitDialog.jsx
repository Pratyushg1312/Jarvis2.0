import React from "react";
import { useNavigate } from "react-router-dom";

const AccountSubmitDialog = ({
  response,
  closeModal,
  id,
  accountMasterData,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      {response === "Success" && (
        <div className="alertModalContent">
          <img src={"/assets/images/badge/success.png"} alt="icon" />
          <h2>Success</h2>
          {id == 0 && <h6>Account has been created successfully.</h6>}
          {id != 0 && <h6>Account has been edited successfully.</h6>}
          <button
            className="btn btn-success"
            onClick={() => navigate("/sales/dashboard")}
          >
            HOME
          </button>
          {id == 0 && (
            <button
              className="btn btn-success"
              onClick={() =>
                navigate("/sales/create-sales-booking", {
                  state: {
                    account_data: accountMasterData,
                  },
                })
              }
            >
              Continue to sale booking
            </button>
          )}
          {id != 0 && (
            <button
              className="btn btn-success"
              onClick={() => navigate("/sales/account-overview")}
            >
              Continue to sale Overview
            </button>
          )}
        </div>
      )}
      {response === "Reject" && (
        <div className="alertModalContent">
          <img src={"/assets/images/badge/error.png"} alt="icon" />
          <h2>Error</h2>
          <h6>Task failed. please wait we'll get back to you soon.</h6>
          <button className="btn btn-danger" onClick={closeModal}>
            Try again !
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountSubmitDialog;
