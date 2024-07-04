import useApi from "../utils/useApi"
import Cards from "./Cards"
import Filter from "./Filter";
import  {useState } from "react";
import Footer from"./Footer"
import SimpleSlider from "./SimpleSlider";
import Loder from "../utils/Loder"
// import axios from "axios";
import '../css/Main.css'


const Maincontent = () => {
  const [sort,setSort]=useState("highttolow")
  const [fil,setFil] = useState(null)
  const [productsCarousel, productsCards,category,  carouselCetegory ] = useApi();

  




  // console.log(productsCards,productsCarousel)
  if (!productsCards || !productsCarousel) return <Loder/>;
  const handleSort =(e)=>{
    setSort(e.target.value)
    if(sort==="highttolow"){
      const high = (fil||productsCards).sort((a,b)=> a.price-b.price   )
      setFil(high)
         }else if(sort==="lowtohigh"){
          const low = (fil||productsCards).sort((a,b)=> b.price-a.price)
          setFil(low)
         }
  }


 

  return (
    <>
    <SimpleSlider data = {productsCarousel}  carouselCetegory={carouselCetegory}/>
   <Filter category={category}  card={productsCards} setFil={setFil}   handleSort={handleSort}  sort={sort}/>
      <div className="cards">
    <Cards  card={fil} productCard={productsCards}  />
      </div>
      <Footer/>
    </>
  );
}

export default Maincontent;
