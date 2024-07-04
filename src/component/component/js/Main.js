import MainChild from "./MainChild"

function Main(){
    let peragraph="Thus Yoga Pera was born in the 1L PET format, designed for the family and to be brought to the table to share something light and authentic together. A fruit classic, easy to enjoy at any time of the day."

    return(
        <>
<div className="main">
<h1> YOGAMETIC</h1>
<p>One of the key differences with other forms of yoga is that Iyengar yoga uses supports called ‘props’, like straps, blocks, cushions and blankets.
Props help make Iyengar accessible to all, so everyone can perform asanas correctly and safely – including beginners, and those with physical limitations or different ability or fitness levels.
Iyengar is a disciplined and systematic approach to yoga, with a diverse programme of asanas (you won’t repeat the same sequences every day). This variety in your practice helps prevent injury and overuse.
You will progress at a pace that suits you, and as your practice develops, teachers will start to introduce pranayama – breath control.</p>

<MainChild  pera={peragraph}/>

</div>

</>
)
}

export default Main