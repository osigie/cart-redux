import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

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
          body: JSON.stringify(cart),
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
          status: "Success",
          message: "Send cart data successfully!",
        })
      );
      // const data = await response.json();
    } catch (error) {
      sendCardData().catch((error) => {
        dispatch(
          uiActions.showNotification({
            title: "error",
            status: "error",
            message: "Sending cart data failed!",
          })
        );
      });
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
