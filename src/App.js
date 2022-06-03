import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { uiActions } from "./components/store/ui-slice";
import Notification from "./components/UI/Notification";

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((store) => store.ui.cartIsVisible);
  const notification = useSelector((store) => store.ui.notification);
  const cart = useSelector((store) => store.cart);

  useEffect(() => {
    const sendCardData = async () => {
      dispatch(
        uiActions.showNotification({
          title: "Sending....",
          status: "pending",
          message: "Sending cart data!",
        })
      );
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

      dispatch(
        uiActions.showNotification({
          title: "Success",
          status: "Success",
          message: "Send cart data successfully!",
        })
      );

      const data = await response.json();
    };

    sendCardData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          title: "error",
          status: "error",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart]);


  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.name}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
