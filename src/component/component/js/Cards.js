import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Card.css"
const Cards = ({ card,productCard }) => {
const Navigate= useNavigate()
function handleSubmit(id){
Navigate(`/products/${id}`)
  }



  return (
    <>
      {(card||productCard).map((element, index) => (
        <article className="information card" key={index} onClick={()=>handleSubmit(element.id)}>
          <span className="category">{element.category}</span>
          <div className="imageContainer">
            <img className="ProductImage" src={element.thumbnail} alt="" />
          </div>
          <h2 className="productName">{element.title}</h2>
          <div className="productRating">
           {/*<img src={element.rating>4?(require("../img/4.png")):
          // (element.rating<4 && element.rating>3)?(require("../img/5.png")):
          // (element.rating<3 && element.rating>2)?(require("../img/threeandhalf.png")):
          // (require("../img/three.png")) }/>8*/}
          </div>
          <div className="productPriceElement">
            <p className="productPrice">₹{element.price}</p>
          </div>
       
        </article>
      ))}
    </>
  );
};

export default Cards;
