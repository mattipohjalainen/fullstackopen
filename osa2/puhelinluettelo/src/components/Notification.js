import React from "react";

const Notification = props => {
  const message = props.message;
  const type = props.messageType;
  if (message === null) {
    return null;
  }
  if (type === 'removal') {
    return <div className="removal">{message}</div>;
  } else {
    return <div className="insert">{message}</div>;
  }
};

export default Notification
