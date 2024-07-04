import React, { useEffect } from 'react'
import "../css/Checkout.css"
import app from "../utils/firebase"
import { getDatabase,ref,set,push,get, remove } from "firebase/database"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from '../utils/Redux/CartSlice'
function Address() {
    const [hide, setHide] = useState("none")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [landmark, setLandmark] = useState("")
    const [reload,setReload]= useState(true)
    const[filterAddress,setFilterAddress]=useState([])
    const [ls, setLs] = useState([])
    const [checkbox, setCheckbox] = useState([])
    const Dispatch= useDispatch()
    const Navigate=useNavigate()
    
    
    const {name,email}= JSON.parse( localStorage.getItem("userDetails"))
    const finalOrder=  useSelector((state) => state.cart.items);
    // console.log(finalOrder)
    const updatedfinalOrder= finalOrder.map((elm)=>{
  return {...elm,Email:email}
})


const price =updatedfinalOrder.map((elm)=>{
    return elm.price
}).reduce((Total,num)=>{
    return Total+num;
    },0)

// set data
    const submit=async(e)=>{
        // e.preventDefault()
        const db=getDatabase(app);
        const newDocRef=push(ref(db,"User/Data"));
      set(newDocRef,{
      id:new Date().getTime().toString(),
      userAddress:address,
      userPincode:pincode,
      userLandmark:landmark,
      email:email,
      name:name,
      orders:updatedfinalOrder
    }).then(()=>{
        setReload(!reload)
        alert("address updated succesfully")
    }).catch((error)=>{
        alert("error",error.message)
    })
    }
//    

// data base get data
const fetchData=async()=>{
    const db=getDatabase(app);
    const dbRef=ref(db,"User/Data")
    const snapshot=await get(dbRef);
    if(snapshot.exists()){
        setLs(Object.values(snapshot.val()))
    } else{
        alert("please enter your address")
    }
    }
    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        const filterAdd = ls.filter((elm) => {
            return elm.email === email;
        });

        setFilterAddress(filterAdd)
    },[])
        console.log(filterAddress)

        const handlesubmiteA=(e)=>{
            setAddress(e.target.value)
        }
        const handlesubmiteB=(e)=>{
            setPincode(e.target.value)
        }
        const handlesubmiteC=(e)=>{
            setLandmark(e.target.value)
        }

        const handlesubmite=()=>{
            setHide((prevstate)=>{
                if(prevstate=="none"){
                    setHide("block")
                    return "block"
                }
            else if(prevstate=="block"){
                setHide("none")
                return "none"
            }})
        }
            const handleSubmiteAddress=()=>{
                // submit()
                Dispatch(addAddress(checkbox))
                Navigate("/payment")
            }

const handleCheckBox=(id)=>{
   const add= ls.find((elm)=>{
        return elm.id==id
    })
    setCheckbox(add)
    
}

console.log(checkbox)
// checkbox hook is used for sedning selected address data

const Edit=()=>{

}
return (
    <div className='addressMainDiv'>
    <header className='Checkout'>
    <h1>Apna Store</h1>
    <h2>CHECKOUT</h2>
    <i class="fa-solid fa-file"></i>
    </header>
    <h2 style={{color:"red",marginTop:"50px"}} >1 Select a delivery address </h2>
    <div  className='Flex'>
    <div className='AddressSection'>
    <div className='Heading'>
    <h4>Your addresses</h4>
    <h5 style={{  textDecoration: "underline", color:"green"}}>Sending items to more than one address?</h5>
    </div>
    <hr className='horiline'/>
    <div className='Alladdress' >
    {filterAddress.map((elm,index)=>(
    <div>
    <label name='add' for={index}></label>
    <input type="radio" name='add'  id={index} onClick={()=>handleCheckBox(elm.id)}/>
    <span  style={{paddingLeft:"5px"}} >{elm.name}</span> <p style={{position:"static",paddingLeft:"15px"}}>{elm.userAddress}, rajasthan, {elm.userPincode},{elm.userLandmark
    } </p>
    <button className='addressBTN' onClick={Edit} key={elm.id}>Edit address</button><span>/</span><button className='addressBTN'>Add delivery instructions</button>
    <button className='dltbtn' > <i style={{border:"none",fontSize:"15px",outline:"none" ,marginLeft:"30px",backgroundColor:"transparent"}}  class="fa-solid fa-trash-can"></i></button>
    </div>
)    
)
    } 
</div> 
<button className="addAddressBTN" onClick={handlesubmite}><i class="fa-solid fa-plus"></i>Add New Address</button>
<div   style={{display:hide}}>
<div className="forM" >
<input placeholder="Enter address" onChange={(e)=>{handlesubmiteA(e)}} type="text" />
<input placeholder="Enter pincode" onChange={(e)=>{handlesubmiteB(e)}} type="number" />
<input placeholder="Enter landmark" onChange={(e)=>{handlesubmiteC(e)}} type="text" /> <br/>
<button onClick={submit}>submit</button>
</div>
</div> 
</div>

<div className='ProcessToPay'>
<button onClick={handleSubmiteAddress}>Use this Address</button>
<i style={{fontSize:"10px"}}>Choose a shipping address and payment method to calculate shipping, handling and tax.</i>
<hr style={{marginTop:0, width:"280px",backgroundColor:"blue"}}/>

<div>
<h4>Order Summary</h4>
<hr style={{marginTop:0, width:"280px",backgroundColor:"blue"}}/>

<p>items</p>
<p>delivery</p>
<h4>Order Total:${price}</h4>
<hr style={{marginTop:0, width:"280px",backgroundColor:"blue"}}/>
<div>
<p>How are delevery Cost calculated</p>
</div>
</div>

</div>
    </div>
    </div>
  )
}

export default Address;


