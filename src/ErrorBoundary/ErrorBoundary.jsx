import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleError = (error) => {
    setHasError(true);
  };

  useEffect(() => {
    const errorHandler = (event) => {
      handleError(event.error || new Error("Unknown error occurred"));
    };

    // Catch global errors
    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", (event) => {
      handleError(event.reason || new Error("Unhandled rejection"));
    });

    // Cleanup the event listeners
    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", errorHandler);
    };
  }, []); // Empty dependency array means this effect runs only once (on mount)

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

export default ErrorBoundary;
