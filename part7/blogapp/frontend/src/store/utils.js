import {
  pushNotification,
  resetNotification,
} from "./slices/notificationSlice";

export function notify(dispatchFn, message, type = "info") {
  dispatchFn(pushNotification({ message, type }));
  setTimeout(() => {
    dispatchFn(resetNotification());
  }, 5000);
}
