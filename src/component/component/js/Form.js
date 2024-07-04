import React, { useState } from 'react'
import SignupPage from './SingupPage'
import SignInPage from './SignInPage'


const Form = () => {
    const [hide, setHide] = useState(true)
    
    return (
        <>
        <div className='body'>
        {hide?<SignInPage hide={hide} setHide={setHide} />:<SignupPage hide={hide} setHide={setHide}  />}
        </div>
    </>
)
}

export default Form



{ /*<div class="container">
<button Login class="log btn"  onClick={()=>setHide(!hide)}>{hide?"Login":"sign Up"}</button>

</div>*/}