import React from "react";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const { message, type } = notification;

  const notificationStyle = {
    fontWeight: "bold",
    fontFamily: "sans-serif",
    padding: 10,
    margin: "5px 0",
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor:
      type === "success" ? "green" : type === "error" ? "red" : "blue",
    background:
      type === "success"
        ? "lightgreen"
        : type === "error"
        ? "pink"
        : "lightblue",
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
