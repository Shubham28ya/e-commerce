import React from 'react'
import "../css/Payment.css"
import { useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import app from "../utils/firebase"
import { getDatabase,ref,get } from "firebase/database"
import paytm  from "../img/paytm.png"
import phonepay  from "../img/phone.png"
import googlepay  from "../img/google.png"
import bhim  from "../img/bhim.png"


const Payment = () => {

    // const img=[paytm,phonepay,googlepay,bhim]
    const [ls, setLs] = useState([])
    const [hide, setHide] = useState("none")
const Navigate=useNavigate()
const Address=useSelector((state)=>state.cart.address)
const {userAddress,userLandmark,userPincode}=Address
// console.log(userAddress,userLandmark)
console.log(Address)
const submitPayment=()=>{
    Navigate("/orderhistory")
}
const {name,email}= JSON.parse( localStorage.getItem("userDetails"))

const fetchData=async()=>{
    const db=getDatabase(app);
    const dbRef=ref(db,"User/Data")
    const snapshot=await get(dbRef);
    if(snapshot.exists()){
        setLs(Object.values(snapshot.val()))
    } else{
        alert("error")
    }
    }
    useEffect(()=>{

        fetchData()
    },[])

// const filterAddress= ls.find((elm)=>{
//     return elm.userAddress==address
// })
// console.log(address)

// console.log(filterAddress)



const paymentBox = () => {
    setHide(prevState => {
        if (prevState === "none") {
            return "block";
        } else {
            return "none";
        }
    });
};

const close = ()=>{
    setHide("none")
}








  return (
    <>
    <div className='mainPaymentDiv'>
<div className='griddelivery'>
<div className='one' >
<h4 style={{color:"green"}}>1.Delivery Address</h4>
</div>
<div className='PaymentDelivery'>
<h5>Name: {name}</h5>
<h5>Email Id: {email}</h5>
<h5>Home Address: {userAddress}</h5>
<h5>Pincode: {userPincode}</h5>
<h5>Landmark: {userLandmark}</h5>
<h5>rajasthan</h5>

</div>
<div className='two'>
<button style={{background:"transparent",border:"1px solid blue",padding:"3px 5px",borderRadius:"3px"}}>change</button>
</div>
</div>
<hr style={{width:"100%",backgroundColor:"blue"}}/>
<h4 style={{color:"red",paddingLeft:"20px"}}>2.Payment Options</h4>
    </div>
    <div className='paymentOptions'>
    <div>
    <button className='subpaybtn' onClick={submitPayment}>Submit</button>
    </div>
    <div>
    
    <input onClick={paymentBox} type="radio"  id='cod' name="paymentO"/><label for='cod' name="paymentO"> COD (cash on delivery)</label>
    </div>
    <div>
    <input onClick={paymentBox} type="radio"  id='credit' name="paymentO"/><label for='credit' name="paymentO"> Credit card</label>
    </div>
    <div>
    <input onClick={paymentBox} type="radio"  id='debit' name="paymentO"/><label for='debit' name="paymentO"> Debit card</label>
    </div>
    <div>
    <input onClick={paymentBox} type="radio"  id='net' name="paymentO"/><label for='net' name="paymentO"> Netbanking</label>
    </div>
    <div style={{display:hide}} className='child-bg' >
    <div className='imgi paymentChildBox'>
    <button className='paybtn' onClick={close}>X</button>
<input type="radio"  id='paytm' name='pay'/> <img src={paytm} alt="" /> <label for='paytm' name='pay'>Paytm</label> <br/>
<input type="radio" id='phone' name='pay'/><img src={phonepay} alt="" /> <label for="phone" name='pay'>PhonePay</label> <br/>
<input type="radio" id='google' name='pay' /><img src={googlepay} alt="" /> <label for="google" name='pay'>googlePay</label> <br/>
<input type="radio" id='bhim' name='pay'/><img src={bhim} alt="" /> <label for="bhim" name='pay'>Bhim</label>
</div>
</div>
    </div>

    </>
  )
}

export default Payment;
