
import SecondMainChild from "./SecondMainChild"
function MainChild({pera}){
    return(
        <>
        <h1>About Yoga:{pera}</h1>
        <SecondMainChild heading={pera}/>
        </>
    )
}
export default MainChild