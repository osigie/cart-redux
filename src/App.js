import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCardData, fetchCartData} from "./components/store/cart-action";

let dSend = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((store) => store.ui.cartIsVisible);
  const notification = useSelector((store) => store.ui.notification);
  const cart = useSelector((store) => store.cart);



useEffect(() =>{
 dispatch(fetchCartData())
}, [dispatch])


  useEffect(() => {
    if (dSend) {
      dSend = false;
      return;
    }
    if(cart.check){
      dispatch(sendCardData(cart));
    }
  }, [cart,dispatch]);

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
