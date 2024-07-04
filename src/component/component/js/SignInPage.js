import { useEffect, useState } from "react";
import "../css/Form.css"
import React from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addUser,addPass } from "../utils/Redux/CartSlice";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addEmail } from "../utils/Redux/CartSlice";

function SignInPage({hide,setHide}) {
const [user, setUser] = useState("");
const [pass, setPass] = useState("");
const [show, setShow] = useState("password");
const [labelemail, setLabelemail] = useState("");
const [labelpass, setLabelpass] = useState("");
const [emailborder, setEmailborder] = useState('black');
const [passborder, setPassborder] = useState('black');
const [currentIcon, setCurrentIcon] = useState("fa-solid fa-eye-slash");
const [smily, setSmily] = useState("");
const [see, setSee] = useState("none");
const Navigate = useNavigate()
const Dispatch=useDispatch()

const name = ""
let submit = (e) => {
e.preventDefault();
signInWithEmailAndPassword(auth, user, pass)
  .then((userCredential) => {
    const use = userCredential.user;
    // console.log(use)
    const data = {
      name: use.displayName,
      email: use.email,
    };
    Dispatch(addEmail(data.email))

    // console.log(data);
    localStorage.setItem("userDetails", JSON.stringify(data));


    if(use.email ==user ){
        Navigate("/orderhistory")
setLabelemail("");
setLabelpass("");
setPassborder("white");
setEmailborder("white");
setSmily("");
setUser("")
setPass("")
alert("Login successfully");
name =use.email


}



    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};

const update = () => {
setShow((prevShow) => {
if (prevShow === "password") {
setCurrentIcon("fa-regular fa-eye");
return "text";
} else {
setCurrentIcon("fa-solid fa-eye-slash");
return "password";
}
});
};

const display = () => {
setSee((prevSee) => (prevSee === "none" ? "block"  : "none"));

};

return (
<>
<form onSubmit={submit} className="ring" >
<span style={{color: "red"}}></span>
<span style={{color: "white"}}></span>
<span style={{color: "red"}}></span>
<div className="login">
<h2>Login</h2>
<div className="inputBx">
<input
style={{borderColor: emailborder}}
type="text"
placeholder="Enter your email"
autoComplete="on"
value={user}
onChange={(e) => setUser(e.target.value)}
required
/>
<label style={{color: emailborder}}>{labelemail}</label>
</div>
<div className="inputBx">
<input
style={{borderColor: passborder}}
type={show}
placeholder="Enter password"
value={pass}
onChange={(e) => {
setPass(e.target.value);
let value = e.target.value;
if (value.length <= 4) {
setPassborder("red");
setLabelpass("Password is too weak");
setSmily("fa-regular fa-face-frown");
} else if (value.length >= 5 && value.length <= 8) {
setPassborder("orange");
setLabelpass("Password is medium");
setSmily("fa-regular fa-face-grin");
} else {
setPassborder("green");
setLabelpass("Password is strong");
setSmily("fa-solid fa-face-laugh-beam");
}
}}
required
/>
<button className="eye" type="button" onClick={update}><i style={{fontSize:"20px"}} className={currentIcon}></i></button>
<label style={{color: passborder}}>{labelpass}</label><i className={smily} id="smily"></i>
</div>
<i className="fa-solid fa-circle-info" id="info" onClick={display}></i>
<div className="passwordinstruction" style={{display: see}}>
<p>Password should contain:</p>
<h6>At least one special character</h6>
<h6>At least one alphabet</h6>
<h6>At least one digit</h6>
<h6>One special small letter</h6>
<h6>One special capital letter</h6>
</div>
<div className="inputBx">
<input type="submit" value="Sign in"/>
</div>
<div className="links">
<a href="#">Forgot Password</a>
 <button className="signupbtn" onClick={()=>setHide(!hide)} >Signup</button>
</div>
</div>
</form>


</>

);
}

export default SignInPage;




