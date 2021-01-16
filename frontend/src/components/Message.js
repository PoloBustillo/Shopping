import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({
  variant,
  children,
  showDefault,
  handleShow,
  dismissible = false,
}) => {
  return (
    <Alert
      show={showDefault}
      onClose={() => handleShow(false)}
      dismissible={dismissible}
      variant={variant}
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
  showDefault: true,
  handleShow: () => {
    return false;
  },
};

export default Message;
