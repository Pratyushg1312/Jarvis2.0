import React, { useEffect, useRef } from 'react';
import './App.css';
import Router from './Routes/Router.jsx';
import DummyPage from './Pages/Dummy/DummyPage.jsx';

function App() {
  const checkbox = useRef(null);

  useEffect(() => {
    const handleCheckboxChange = () => {
      if (checkbox?.current?.checked) {
        document.body.classList.add("sidebarActive");
      } else {
        document.body?.classList?.remove("sidebarActive");
      }
    };

    const checkboxElement = checkbox?.current;
    checkboxElement.addEventListener("change", handleCheckboxChange);

    // Cleanup event listener on component unmount
    return () => {
      checkboxElement?.removeEventListener("change", handleCheckboxChange);
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



      <Router />
    </div>
  );
}

export default App;
