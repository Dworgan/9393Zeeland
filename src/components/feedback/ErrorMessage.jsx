import React, { useState } from "react";
import ReactJsAlert from "reactjs-alert";

export default function ErrorMessage({ type, title, message }) {
  const [status, setStatus] = useState(false);
  return (
    <ReactJsAlert
      status={status} // true or false
      type={type} // success, warning, error, info
      title={title}
      quotes={true}
      quote="This is a dummy design that shows an example of reactjs-alert"
      Close={() => setStatus(false)}
      autoCloseIn={3000}
    />
  );
}
