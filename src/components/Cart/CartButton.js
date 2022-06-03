import classes from './CartButton.module.css';
import {uiActions } from "../../store/ui-slice"
import {useDispatch, useSelector} from "react-redux"

const CartButton = (props) => {
   const dispatch = useDispatch()
   const totalQuantity = useSelector((store)=>store.cart.totalQuantity)
  const toggleChangeHandler = ()=>{
dispatch(uiActions.toggle())
  }
  return (
    <button className={classes.button} onClick = {toggleChangeHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
