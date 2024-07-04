import React, { useState } from 'react'
import "../css/Fliter.css"

const Filter = ({ category, card,setFil ,sort,handleSort}) => {
   // console.log(category) 
    const handleFilter = (ele) => {
      const filteredCards = card.filter((item) => {
      if(  item.category === ele) {
        return item.category}

      else if("All"===ele) {
        return item
      }
      });
      setFil(filteredCards)
    //   console.log(filteredCards);
    };


  const handleSubmite=(e)=>{
    const search= card.filter((item)=>{
      return item.title.toLowerCase().includes(e.target.value)

    })
setFil(search)
  }

  return (
    <div className='Maincontent'>
    <div className="Search">
    <input type="search" onChange={(e)=>{handleSubmite(e)}} />
    <button type="submit"> submit</button>
    </div>
    <div className="cetegory_list">
    {category.map((elm)=><button onClick={()=>handleFilter(elm)}>{elm}</button>)}
    <div className="dropdown">
    <label for="Filter" style={{color:"white"}}>Choose a Filter:</label>
    <select name="Filter" id="Filter" value={sort} onChange={(e)=>handleSort(e)} on  style={{background:"white",color:"black"}}>
      <option value="highttolow" >High to Low</option>
      <option value="lowtohigh">Low to High</option>    
      </select>
    </div>
    </div>
    </div>
  )
}

export default Filter
