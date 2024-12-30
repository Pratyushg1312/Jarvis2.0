import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import "./App.css";
import Router from "./Routes/Router.jsx";

import OfflinePage from "./Components/CommonComponent/OfflinePage/OfflinePage.jsx";
function App() {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const {
    message = "",
    type = "success",
    show = false,
  } = useSelector((state) => state.notification || {}); // Get notification state from Redux
  const checkbox = useRef(null);

  useEffect(() => { // Show toast notification
    if (show) {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    }
  }, [show, message, type]);

  useEffect(() => { // Event listener for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };
    const handleCheckboxChange = () => {
      if (checkbox?.current?.checked) {
        document.body.classList.add("sidebarActive");
      } else {
        document.body?.classList?.remove("sidebarActive");
      }
    };


    const checkboxElement = checkbox?.current;
    checkboxElement?.addEventListener("change", handleCheckboxChange);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listener on component unmount
    return () => {
      checkboxElement?.removeEventListener("change", handleCheckboxChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);



  return (
    <div className="app bodyWrapper">
      <input
        ref={checkbox}
        type="checkbox"
        id="toggle-sidebar"
        className="toggle-sidebar-checkbox"
      />
      <ToastContainer autoClose={1500} />
      {!isOnline && <OfflinePage />}
      <Router />
    </div>
  );
}

export default App;
