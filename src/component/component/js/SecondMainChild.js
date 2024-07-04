import {useState} from 'react'
import '../css/Button.css'

let SecondMainChild=({heading})=>{
    let [update, setupdate] = useState(0)
    let updateHandler= ()=>{
        setupdate(update+1)
    }
    let updateH=()=>{
        if (update>0){
            setupdate(update-1)
        }
    }
    let zero=()=>{
        if (update>0){
setupdate(0)      
  }
    }
    return(
<>
<h6> this is heading {heading}</h6>
<h4> count:{update}</h4>
<button onClick={updateHandler}>Update (+)</button>
<button onClick={updateH}>Update (-)</button>
<button onClick={zero}> RESET</button>
</>
)
}
export default SecondMainChild