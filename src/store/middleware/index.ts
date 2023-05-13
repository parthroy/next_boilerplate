/* eslint-disable no-unused-vars */
import * as notification from "../notification";

const apiMiddleware = (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    case "auth/login/fulfilled":
      store.dispatch({
        type: "user/authenticateUser",
        payload: { ...action.payload.data },
      });
      next(action);
      break;
    case "auth/logout":
      store.dispatch({
        type: "user/reset",
      });
      next(action);
      break;

    case "auth/login/rejected" ||
      "notification/showErrorNotification" ||
      "coupons/deletecoupon/rejected" ||
      "coupons/getcoupons/rejected" ||
      "coupons/updatecoupon/rejected" ||
      "deals/getdeals/rejected" ||
      "notification/showErrorNotification":
      store.dispatch({
        type: "notification/showErrorNotification",
        payload: {
          msg: action.error.message,
          NotificationType: notification.NOTIFICATION_TYPE.ERROR,
        },
      });
      next(action);
      break;

    default:
      next(action);
      break;
  }
};

export default apiMiddleware;
