import React, { useState } from 'react'

const rough = () => {
const [details,setDetails]= useState({
    email:"",
    username:"",
    password:""
})

const handleChange=(e)=>{
const {name,value} = e.target
setDetails({
    ...details, [name]:value
})
}

function handleSubmit (){
console.log(details)
}

  return (
    <div>
    <input type='text' name='username' value={details.username} onChange={handleChange}/>
    <input type='text' name='email' value={details.email} onChange={handleChange}/>
    <input type='password' name='password' value={details.password} onChange={handleChange}/>
    <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default rough