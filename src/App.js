import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux"
import React, {useEffect } from "react"

function App() {
  const cartIsVisible = useSelector((store)=>store.ui.cartIsVisible)
  const cart = useSelector((store)=>store.cart)

  useEffect(()=>{
fetch("https://redux-59ee1-default-rtdb.firebaseio.com/cart.json", {method: "PUT", body: JSON.stringify(cart)})
  },[cart])


  
  return (
    <Layout>
      {cartIsVisible &&     <Cart />}
  
      <Products />
    </Layout>
  );
}

export default App;
