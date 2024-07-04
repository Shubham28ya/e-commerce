import "../css/Order.css";
import { useDispatch, useSelector } from "react-redux";
import { removeItem,increment,decrement } from "../utils/Redux/CartSlice";
import { useState } from "react";
import Emptycart from "./Emptycart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import app from "../utils/firebase"
import { getDatabase,ref,set,push} from "firebase/database"
const Order = () => {
  const cartList = useSelector((state) => state.cart.items);
  const carouselList=useSelector((state=>state.cart.items2))
  console.log(cartList)
  const [price, setPrice] = useState("")
  const Navigate=useNavigate()
  const Dispatch= useDispatch()
  function handleRemove(index){
    Dispatch(removeItem(index))
  }
  const handledecrement=(id)=>{
    Dispatch(decrement(id))
  }

  const handleincrement=(id)=>{
    Dispatch(increment(id))
  }
useEffect(() => {
  const calculateTotal = () => {
    let total = 0;
    cartList.forEach((item) => {
      total += item.price * item.quantity;
    });
    carouselList.forEach((item) => {
      total += item.price * item.quantity;
    });
    setPrice(total);
  };

  calculateTotal();
}, [cartList, carouselList]);




const handlesubmiteCheckout=()=>{
  const LS= JSON.parse(localStorage.getItem("userDetails"))
  if(!LS){
    Navigate("/login")
  } else {

    Navigate("/address")
  }
}





  return (
    <main >
    <h1 style={{color:"white"}} >Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {(cartList.length>0||carouselList.length>0) ?(cartList||carouselList).map((elm,index) => (
            <div className="cart-item" >
              <img src={(elm.images)||(elm.image)} alt={elm.category} />
              <div className="item-details">
                <h2 style={{color:"black"}}>{elm.title}</h2>
                <p className="price">${elm.price}</p>
                <h5 >{elm.description}</h5>
                <div className="quantity">
                  <button onClick={() => {handledecrement(elm.id,elm) }} className="qty-btn">-</button>
                  <input  type="number" value={elm.quantity} min="1" readOnly />
                  <button onClick={() =>{ handleincrement(elm.id,elm)}}
                  className="qty-btn">+</button>
                </div>
                <button onClick={()=>handleRemove(index)} className="remove-btn">Remove</button>
              </div>
            </div>
          )):<Emptycart/>}
          </div>

          <div className="cart-summary">
            <h2>Summary</h2>
            <p style={{color:"black"}} >Total:{price}</p>
            <button className="checkout-btn" onClick={(e)=>{handlesubmiteCheckout(e)}}>Proceed to Checkout</button>
          </div>
      </div>
    </main>
  );
};

export default Order;




