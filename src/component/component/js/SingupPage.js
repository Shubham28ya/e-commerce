// import { useState } from "react";
// import {  createUserWithEmailAndPassword } from "firebase/auth";
// import Formvalidation from "./Formvalidation";
// import { auth } from "../utils/firebase";
// import { updateProfile } from "firebase/auth/web-extension";
// const SignupPage = ({ hide, setHide }) => {
//   const [first, setFirst] = useState("");
//   const [last, setLast] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailLabel, setEmailLabel] = useState("");
//   const [passwordLabel, setPasswordLabel] = useState("");
//   const getAuth = auth

//   console.log(first)
//   const pushDatainLS = (e) => {
//     e.preventDefault();
//     const { isEmailValid, isPassValid, emailMessage, passMessage } = Formvalidation(email, password);
//     setEmailLabel("");
//     setPasswordLabel("");
// if(isEmailValid && isPassValid){
//     createUserWithEmailAndPassword(getAuth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       updateProfile(user,{displayName:first})
      
//       console.log(user)
//       const data= {
//         name:user.displayName,
//         email:user.email
//       }

//       console.log(data)
// localStorage.setItem("userDetails",JSON.stringify(data))
// console.log(user.displayName)

//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
//     setFirst("");
//       setLast("");
//       setEmail("");
//       setPassword("");
//     alert("Account Created Succefully")
//   }


//     if (!isEmailValid) {
//       setEmailLabel(emailMessage);
//       return;
//     }
//     if (!isPassValid) {
//       setPasswordLabel(passMessage);
//       return;
//     }
//     // const newUserDetails = {
//     //   firstName: first,
//     //   lastName: last,
//     //   email: email,
//     //   password: password,
//     // };

//     // const LsgetData = JSON.parse(localStorage.getItem("userdetails")) || [];
//     // const emailExists = LsgetData.some((user) => user.email === email);

//   //   if (!emailExists) {
//   //     const updatedData = [...LsgetData, newUserDetails];
//   //     localStorage.setItem("userdetails", JSON.stringify(updatedData));
//   //     setFirst("");
//   //     setLast("");
//   //     setEmail("");
//   //     setPassword("");
//   //     alert("Account created successfully");
//   //     setHide(""); 
//   //   } else {
//   //     setEmailLabel("Account already exists");
//   //   }
//   };

//   return (
//     <>
//       <form className="ring" onSubmit={pushDatainLS}>
//         <div className="login">
//           <h2>Sign Up</h2>
//           <div className="inputBx">
//             <input
//               required
//               type="text"
//               placeholder="First Name"
//               value={first}
//               onChange={(e) => setFirst(e.target.value)}
//             />
//             <input
//               required
//               type="text"
//               placeholder="Last Name"
//               value={last}
//               onChange={(e) => setLast(e.target.value)}
//             />
//           </div>
//           <div className="inputBx">
//             <input
//               required
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label style={{ color: "red" }}>{emailLabel}</label>
//           </div>
//           <div className="inputBx">
//             <input
//               required
//               type="text"
//               placeholder="Create Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <label style={{ color: "red" }}>{passwordLabel}</label>
//           </div>
//           <div className="inputBx signup">
//             <input type="submit" value="Sign up" />
//           </div>
//         </div>
//         <div className="haveaccount">
//           <button className="account" type="button" onClick={() => setHide(!hide)}>
//             Already have an account <label style={{ color: "blue" }}>Login</label>
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SignupPage;



import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Formvalidation from "./Formvalidation";
import { auth } from "../utils/firebase";

const SignupPage = ({ hide, setHide }) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLabel, setEmailLabel] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const { isEmailValid, isPassValid, emailMessage, passMessage } = Formvalidation(email, password);
    setEmailLabel("");
    setPasswordLabel("");

    if (isEmailValid && isPassValid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile with the display name
        await updateProfile(user, { displayName: first });

        // Fetch updated user details
        const updatedUser = auth.currentUser;

        const data = {
          name: updatedUser.displayName,
          email: updatedUser.email,
        };

        console.log(data);
        localStorage.setItem("userDetails", JSON.stringify(data));
        alert("Account Created Successfully");
        setFirst("");
        setLast("");
        setEmail("");
        setPassword("");
      } catch (error) {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      }
    } else {
      if (!isEmailValid) setEmailLabel(emailMessage);
      if (!isPassValid) setPasswordLabel(passMessage);
    }
  };

  return (
    <>
      <form className="ring" onSubmit={handleSignup}>
        <div className="login">
          <h2>Sign Up</h2>
          <div className="inputBx">
            <input
              required
              type="text"
              placeholder="First Name"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
          <div className="inputBx">
            <input
              required
              type="email" // Changed to "email" for proper email validation
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label style={{ color: "red" }}>{emailLabel}</label>
          </div>
          <div className="inputBx">
            <input
              required
              type="password" // Changed to "password" for proper password input type
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label style={{ color: "red" }}>{passwordLabel}</label>
          </div>
          <div className="inputBx signup">
            <input type="submit" value="Sign up" />
          </div>
        </div>
        <div className="haveaccount">
          <button className="account" type="button" onClick={() => setHide(!hide)}>
            Already have an account <label style={{ color: "blue" }}>Login</label>
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
