import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (isNotificationEmpty(notification)) {
    return null;
  }

  const style = {
    color: notification.type === "alert" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div id="notification" style={style}>
      {notification.message}
    </div>
  );
};

function isNotificationEmpty(notification) {
  return !Boolean(notification.type && notification.message);
}

export default Notification;