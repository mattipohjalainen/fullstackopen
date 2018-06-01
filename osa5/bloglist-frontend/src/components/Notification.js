import React from "react";

const Notification = props => {
  const message = props.message;
  const type = props.messageType;
  if (message === null) {
    return null;
  }
  if (type === 'error') {
    return <div className="error">{message}</div>;
  } else {
    return <div className="message">{message}</div>;
  }
};

export default Notification