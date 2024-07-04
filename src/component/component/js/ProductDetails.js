import {  useParams } from "react-router-dom";
import useApi from "../utils/useApi";
import "../css/ProductDetails.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem ,addwish} from "../utils/Redux/CartSlice";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../css/ProducDetailsmedia.css"
  

const ProductDetails = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed:500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
const [img,setImg] = useState(null)
  const { id } = useParams();
  const Dispatch = useDispatch()
    const [productsCarousel, productsCards, category, carouselCetegory] =   useApi();

 if (!productsCards) return;
  const cardData = productsCards.find((elm) => elm.id == id);
  const handlesubmite = (item) => {
  const copy = {...item,quantity:1}
        Dispatch(addItem(copy))
  };
// 14-06-2024
  const handlesubmiteFav=(item)=>{
    const copy = {...item,quantity:1}
    Dispatch(addwish(copy))

  }
const handlesubmiteImg=(e)=>{
setImg(e.target.src)
}
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md  col-lg">
          <div className="Maindiv  ">
             <div className="moreimg">
              {cardData.images.map((image) => (
                <img onClick={(e)=>{handlesubmiteImg(e)}} src={image} /> ))}
            </div>
             
            <div className="Img ">
              <img className="ProductImage" src={img===null?(cardData.thumbnail):img}  alt="" />
              <div className="buttons">
                <button
                  onClick={() => {
                    handlesubmite(cardData);
                  }}
                  className="button cart"
                >
                  <i class="fa-solid fa-cart-shopping"></i>ADD TO CART
                </button>
                <button onClick={() => {
                  handlesubmiteFav(cardData);
                }} className="button fav">
                  <i class="fa-solid fa-bookmark"></i>ADD TO FAV
                </button>
              </div>
            </div>
            <div className="details">
              <h3 style={{color:"white"}}>{cardData.title}</h3>
              <h5 style={{color:"white"}} className="rating">
                {cardData.rating}
                <i class="fa-solid fa-star"></i>
              </h5>
              <div className=" price">
                <p  >
                  <span > Price:</span> {cardData.price}Rs
                </p>
                <p  className="discount">
                  {" "}
                  <span>discountPercentage:</span> {cardData.discountPercentage}
                  %
                </p>
              </div>
              <div className="deliverydetails">
                <span style={{color:"white"}}>Delivery:</span>
                <i class="fa-solid fa-location-dot"></i>
                <input type="number" placeholder="Enter your Pincode"  />
                <button style={{color:"white"}}>Check</button>
              </div>
              <span style={{color:"white"}} className="stock" >Stock:{cardData.stock}</span>

              <div className="productinfo">
                <span style={{color:"white"}}>Description:</span>
              <span style={{color:"white"}}>  {cardData.description} </span>
              </div>
<div className="offers">
<h4>Available offers</h4>
<h5 style={{color:"white"}}><i class="fa-solid fa-check"></i> Bank OfferGet ₹50 instant discount on first Flipkart UPI transaction on order of ₹200 and above <span>T&C</span> </h5>
<h5 style={{color:"white"}}><i class="fa-solid fa-check"></i>Bank Offer5% Cashback on Flipkart Axis Bank Card <span>T&C</span></h5>
<h5 style={{color:"white"}}><i class="fa-solid fa-check"></i>Bank Offer10% off up to ₹1250 on HDFC Bank Credit Card EMI Txns, Tenure: 6 months, Min Txn Value: ₹7500 <span>T&C</span></h5>
<h5 style={{color:"white"}}><i class="fa-solid fa-check"></i>Special PriceGet extra 9% off (price inclusive of cashback/coupon) <span>T&C</span></h5>
</div>

<div className="productInfo">
<h3 style={{color:"#58C7FA"}} ><span className="brandandweight"> Brand:</span>{cardData.brand}</h3>
<h3 style={{color:"#58C7FA"}}> <span className="brandandweight" >Weight:</span>{cardData.weight} KG</h3>
<div className="dimantions">
<span className="DimantionHeading">Dimantions:</span>
<span style={{color:"white"}}>Width:{cardData.dimensions.width}</span>
<span style={{color:"white"}}>Height:{cardData.dimensions.height}</span>
<span style={{color:"white"}}>Depth:{cardData.dimensions.depth}</span>
</div>
</div>

<div className="warrantyInfo">
<p style={{color:"white"}}><span>Warranty:</span>{cardData.warrantyInformation}</p>
<p style={{color:"white"}}><span>Shipping:</span>{cardData.shippingInformation}</p>
<p style={{color:"white"}}><span>Stock:</span> {cardData.availabilityStatus}</p>
</div>

<h3 style={{color:"white"}} className="reviews">Reviews & Rating</h3>
<div className=" reviewsBar">
<div className="ratingBox">
<span className="ratingnum">4.6</span><i class="fa-solid fa-star"></i> <br/>
<span className="ratingD">470 Rating & 75 Reviews</span>
</div>
<div className="bar">
 <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
 <div className="progress-bar bg-success" style={{ width: '90%' }}>
</div>
</div>
<div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
<div className="progress-bar bg-info" style={{ width: '75%' }}></div>
</div>
<div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
<div className="progress-bar bg-warning" style={{ width: '25%' }}></div>
</div>
<div className="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
<div className="progress-bar bg-danger" style={{ width: '10%' }}></div>
</div>
</div>
</div>
<Slider {...settings}>
{cardData.reviews.map((item) => (
  <div className="comment"> 
    <span className="rating reviewR">
      {item.rating}
      <i className="fa-solid fa-star"></i>
    </span>
    <span style={{color:"white"}} className="comments">{item.comment}</span> <br />
    <span  style={{color:"white"}} className="nameR">{item.reviewerName}</span>
    <span style={{color:"white"}} className="emailR">{item.reviewerEmail}</span>
    <span style={{color:"white"}} className="emailR">{item.date}</span>
  </div>
))}
</Slider>


<div className="policy">
<p style={{color:"white"}} > <span>Return policy</span>:{cardData.returnPolicy}</p> <br/>
<p style={{color:"white"}}></p> <span>Minimum Order Quntity</span>:{cardData.minimumOrderQuantity}
<span></span>


</div>
<div className="qrdeatils"> 
<p style={{color:"white"}}>For buy scan here: </p>
<img src={cardData.meta.qrCode} alt="" /> <br/>
<p style={{color:"white"}}><span>QR number:</span> {cardData.meta.barcode} </p> 
<p style={{color:"white"}}><span>Creat Date:</span> {cardData.meta.createdAt}</p>
<p style={{color:"white"}}><span>Update Date:</span> {cardData.meta.updatedAt}</p>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
