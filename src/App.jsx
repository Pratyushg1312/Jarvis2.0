import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Router from "./Routes/Router.jsx";

import OfflinePage from "./Components/CommonComponent/OfflinePage/OfflinePage.jsx";
import { setthemeCollapse } from "./Redux/Slices/ThemeSlices/ThemeCollapseSlice.js";
function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.loading);

  useEffect(() => {
    // this code may cause vulnerability so please  inform pratyush  to reserch on it and i am adding this comment for my self

    const handleGlobalClick = (event) => {
      // Check if the user pressed Ctrl (Windows/Linux) or Meta (macOS) while clicking
      if (event.ctrlKey || event.metaKey) {
        localStorage.setItem("token", sessionStorage.getItem("token"));
        setTimeout(() => {
          localStorage.removeItem("token");
        }, 10000);
      }
    };

    // Add a global click event listener
    document.addEventListener("click", handleGlobalClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  if (localStorage.getItem("token")) {
    sessionStorage.setItem("token", localStorage.getItem("token"));
  }
  const {
    message = "",
    type = "success",
    show = false,
  } = useSelector((state) => state.notification || {}); // Get notification state from Redux
  const checkbox = useRef(null);
  const ref = useSelector((state) => state.themeCollapse);

  useEffect(() => {
    // Show toast notification
    if (show) {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    }
  }, [show, message, type]);

  useEffect(() => {
    // Event listener for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (ref.ref) {
      document.body.classList.add("sidebarActive");
    } else {
      document.body.classList.remove("sidebarActive");
    }
  }, [ref]);

  return (
    <div className="app bodyWrapper">
      <input
        ref={checkbox}
        defaultChecked={ref.ref}
        onChange={(e) => dispatch(setthemeCollapse(e.target.checked))}
        type="checkbox"
        id="toggle-sidebar"
        className="toggle-sidebar-checkbox"
      />
      {isLoading && <Loader />}
      <ToastContainer autoClose={1500} />
      {!isOnline && <OfflinePage />}
      <Router />
    </div>
  );
}

export default App;
