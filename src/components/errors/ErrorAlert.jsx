import React from "react";

const ErrorAlert = ({ error }) => {
  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
};
export default ErrorAlert;
