import React from "react";
import { Alert } from "reactstrap";

export const SuccessAlert = ({ message }) => {
  return (
    <Alert style={{ position: "absolute", top: 0, right: 0, margin: 15 }}>
      {message}
    </Alert>
  );
};
