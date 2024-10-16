import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import "./App.css";
import Router from "./Routes/Router.jsx";
import DummyPage from "./Pages/Dummy/DummyPage.jsx";
import { Log } from "@phosphor-icons/react";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const {
    message = "",
    type = "success",
    show = false,
  } = useSelector((state) => state.notification || {});
  const checkbox = useRef(null);

  useEffect(() => {
    if (show) {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    }
  }, [show, message, type]);

  useEffect(() => {
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
    checkboxElement.addEventListener("change", handleCheckboxChange);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listener on component unmount
    return () => {
      checkboxElement?.removeEventListener("change", handleCheckboxChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <h1>You are offline. Please check your internet connection.</h1>;
  }

  return (
    <div className="app bodyWrapper">
      <input
        ref={checkbox}
        type="checkbox"
        id="toggle-sidebar"
        className="toggle-sidebar-checkbox"
      />
      <ToastContainer autoClose={1500} />
      <Router />
    </div>
  );
}

export default App;
