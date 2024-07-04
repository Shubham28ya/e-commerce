
import { useDispatch, useSelector } from "react-redux";
import "../css/Wishlist.css"
import { addItem, removeItemWish } from "../utils/Redux/CartSlice";
import { useNavigate } from "react-router-dom";
const Wishlist=()=>{
    const data=useSelector(state=>state.cart.items1)
    const CarouselData=useSelector(state=>state.cart.items)
    const Navigate=useNavigate()
    // console.log(CarouselData)
const Dispatch=useDispatch()
    const handleRemove=(i)=>{
        Dispatch(removeItemWish(i))
    }
    const handleAdd=(elm)=>{
Dispatch(addItem(elm))
console.log(elm)
    }


    const handleRedirecttoProductDetails=(elm)=>{
console.log(elm)
    }
    
    return(
        <>
        {(data||CarouselData).map((elm,index)=>(
            <div className="card"  onClick={()=>handleRedirecttoProductDetails(elm)}>
                        <div class="wishlist-item">
                            <img src={(elm.thumbnail)||(elm.image)} alt="Item Image"/>
                            <div class="item-details">
                            </div>
                            <button onClick={()=>handleRemove(index)} class="remove-btn">Remove</button>
                            <button className="addtoCart" onClick={()=>handleAdd(elm)}>Add to Cart</button>

                            </div>
                            </div>
                    ))}
                    </>

        

    )
}
export default Wishlist;