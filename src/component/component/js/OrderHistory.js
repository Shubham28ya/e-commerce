import "../css/OrderHistory.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import app from "../utils/firebase"
import { getDatabase,ref,get } from "firebase/database"


const OrderHistory = () => {
    const [hide, setHide] = useState("none")
    // const [address, setAddress] = useState("")
    // const [pincode, setPincode] = useState("")
    // const [landmark, setLandmark] = useState("")
    const [ls, setLs] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date());
    // const[loginname,setLoginname]=useState(null)
// console.log(ls)
//     const finalOrder=  useSelector((state) => state.cart.items);
//     console.log(finalOrder)
    const {name,email}= JSON.parse( localStorage.getItem("userDetails"))
//     const updatedfinalOrder= finalOrder.map((elm)=>{
//   return {...elm,Email:email}
// })
// console.log(updatedfinalOrder)
// console.log(email)
const handlesubmite=()=>{
setHide((prevstate)=>{
    if(prevstate=="none"){
        setHide("block")
        return "block"
    }
else if(prevstate=="block"){
    setHide("none")
    return "none"
}

}) 
}
const handlesubmiteA=(e)=>{
    // setAddress(e.target.value)
}
const handlesubmiteB=(e)=>{
    // setPincode(e.target.value)
}
const handlesubmiteC=(e)=>{
    // setLandmark(e.target.value)
 }


const handleClear = (index) => {
    const newLs = [...ls]; 
    newLs.splice(index, 1); 
    setLs(newLs); 
    localStorage.setItem("persnolInfo", JSON.stringify(newLs))

  };

 const handleLogout=()=>{
    localStorage.clear()
    // console.log("object")
  }
// data base set data
    // const submit=async(e)=>{
    //     const db=getDatabase(app);
    //     const newDocRef=push(ref(db,"User/Data"));
    // set(newDocRef,{
    // userAddress:address,
    // userPincode:pincode,
    // userLandmark:landmark,
    // email:email,
    // order:updatedfinalOrder
    // }).then(()=>{
    //     alert("address updated succesfully")
    // }).catch((error)=>{
    //     alert("error",error.message)
    // })
    // }
      

    // useEffect(()=>{
    //     submit()
    // },[])

// data base get data
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

const local= ls.filter((elm)=>{
   return elm.email==email 
})


console.log(local, "local")
const Dorders = local.filter(customer => customer.orders)
const Data= Dorders.map((elm)=>{
   return elm.orders
})

console.log(Dorders)
// console.log(local)
// const a=Dorders.orders
// console.log(a)

// const Data= orders.map((elm)=>{
//    return elm.Email==email
// })


useEffect(()=>{
fetchData()
},[])



return (
    <>
      <div className="container CONTAINER">
      <div className="row">
      <div className="col-lg-3 col-md-6  col-sm-10">
      
      <ul className="List">
<NavLink><li>Account Main</li> </NavLink>   
<NavLink><li>New Orders</li> </NavLink>      
<NavLink><li>Orders History</li> </NavLink>      
<NavLink><li>My Wishlist</li> </NavLink>   
<NavLink><li>Transcations</li> </NavLink>      
<NavLink><li>Profile Setting</li> </NavLink>      
<NavLink to="/" onClick={handleLogout}><li>Log Out</li> </NavLink>      
      </ul>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-10 ">
      <div className="cxDetails">
      <span>Name:{name}</span> <br/>
      <span>Email:{name}@gmail.com</span> <span>phone:9782728996</span>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-10 a">
      <button className="addAddressBtn" onClick={handlesubmite}><i class="fa-solid fa-plus"></i>Add New Address</button>
      <hr/>
      <form  style={{display:hide}}>
      <div className="forM" >
      <input placeholder="Enter address" onChange={(e)=>{handlesubmiteA(e)}} type="text" />
      <input placeholder="Enter pincode" onChange={(e)=>{handlesubmiteB(e)}} type="number" />
      <input placeholder="Enter landmark" onChange={(e)=>{handlesubmiteC(e)}} type="text" /> <br/>
      <input   type="submit" value="submit" />
      </div>
      </form> 

<div className="Address">
{/*local.map((elm,index)=>(
    <div   key={index} className="Addresschild">
    <button onClick={()=>handleClear(index)} ><i class="fa-solid fa-multiply"></i></button>
    <p >Address : {elm.userAddress} :{elm.key}</p>
    <p >Pincode:  {elm.userPincode} </p>
    <p>Landmark : {elm.userLandmark} </p>
    </div>
))*/}

</div>

</div>
<div className="col-lg-6 col-md-6 col-sm-10 ">
<h2 style={{color:"white",marginLeft:"-70px"}}>Your Order</h2>
<div className="MainHistoryDiv">
<div className="orderId">
<h4 style={{color:"white",marginLeft:"-40px"}} >Order Id: <span style={{color:"green"}}> {Math.ceil(56789*(Math.random()))}</span></h4>
<h5 style={{color:"white"}}>{currentDate.toLocaleString()}</h5>
</div>
<div className="btnOrder">
<button className="red">Cancle Order</button> <button className="blue">Track Order</button>
</div>
</div>


</div>
<hr/>

<div className="col-lg-6 col-md-6 col-sm-10 ">
<div className="MainContainer">
<div className="persnolInfo">
<h4 style={{color:"white"}}>contact</h4>
<p>{name}</p>
<p>{Math.floor( 9782728996*(Math.random()))}</p>
<p>{name}@gmail.com</p>
</div>
<div className="AddressHistory "> 
<h4 style={{color:"white"}}>Address</h4>

<p>164/444</p>
<p>pratap nagar</p>
<p>coacing bub</p>

</div>
<div className="payment"> 
<h4 style={{color:"white"}}>Payment</h4>
<p style={{color:"green"}}>VISA****567</p>
<p>Shipping Fee</p>
<p>Total Paid</p>
</div>
</div> 
</div>
<hr/>
<div className="col-lg-6 col-md-6 col-sm-10 ">
<div className="FinalproductmainDiv ">
{Data.map((item)=>(
<div className="FinalproductChildDiv"> 
<img src={(item.images)||(item.image)} alt="" />
<p>Title:{item.title}</p>
<p>Price:{item.price}</p>
    </div>
))}
</div>
</div>
</div>
</div>
</div>
    </>
  );
};

export default OrderHistory;

