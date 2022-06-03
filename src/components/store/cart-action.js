import { uiActions } from "./ui-slice";
import {cartActions} from "./cart-slice"


export const sendCardData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        title: "Sending....",
        status: "pending",
        message: "Sending cart data!",
      })
    );

    const sendData = async () => {
      const response = await fetch(
        "https://redux-59ee1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({items:cart.items, totalQuantity:cart.totalQuantity}),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart failed!");
      }
    };

    try {
      await sendData();
      dispatch(
        uiActions.showNotification({
          title: "Success",
          status: "success", 
          message: "Send cart data successfully!",
        })
      );
      // const data = await response.json();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "error",
          status: "error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-59ee1-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data");
      }
      const data = await response.json();
      return data;
    };

    try {
    const cartData = await fetchData();
    dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "error",
          status: "error",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};
 