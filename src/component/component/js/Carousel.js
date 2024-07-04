import { useDispatch } from "react-redux";
import "../css/Crousel.css";
import { addItem, addwish } from "../utils/Redux/CartSlice";
import { useParams } from "react-router-dom";
import useApi from "../utils/useApi";
import { useState, useEffect, useTransition } from "react";
import Loder from "../utils/Loder";

const Carousel = () => {
const [range, setRange] = useState("");
const [review, setReview] = useState(null);
const [filteredProducts, setFilteredProducts] = useState([]);
const [sortedProducts, setSortedProducts] = useState([]);
const [input, setInput] = useState("");
const { category } = useParams();
const dispatch = useDispatch();
const [productsCarousel] = useApi();
const [star, setStar] = useState("material-symbols-light:star-outline")
const [transform, setTransform] = useState("-90vw")

console.log(transform)
useEffect(() => {
if (productsCarousel) {
const sliderCategory = productsCarousel.filter(
(elm) => elm.category.toUpperCase() === category.toUpperCase()
);
setFilteredProducts(sliderCategory);
setSortedProducts(sliderCategory);
}
}, [productsCarousel, category]);

useEffect(() => {
let updatedProducts = [...filteredProducts];

if (range) {
updatedProducts = updatedProducts.filter((elm) => {
const productPriceInRs = elm.price ;
return productPriceInRs <= range;
}
);
}

if (review) {
updatedProducts = updatedProducts.filter(
(elm) => elm.rating.count >= review
);
}

setSortedProducts(updatedProducts);
}, [range, review, filteredProducts]);

const handleAddToCart = (elm) => {
const copy = { ...elm, quantity: 1 };
dispatch(addItem(copy));
};
const handleAddToFav = (elm) => {
const copy = { ...elm, quantity: 1 };
dispatch(addwish(copy));
};

const handleRangeChange = (e) => {
setRange(e.target.value);
};

const handleReviewChange = (e) => {
setReview(e.target.value);
};

const handleLowHighFilter = (e) => {
const sorted = [...sortedProducts].sort((a, b) => {
if (e.target.value === "lowtohigh") {
return a.price - b.price;
} else if (e.target.value === "highttolow") {
return b.price - a.price;
}
return 0;
});
setSortedProducts(sorted);
};

const list = [];
useEffect(() => {
filteredProducts.map((elm) => {
const rs = elm.price;
list.push(rs );
const c = list.sort((a, b) => b - a);
setInput(parseInt(c[0]));
});
}, [range]);

const handlesubmit=(e)=>{
const a= filteredProducts.filter((elm)=>{
    return elm.rating.rate<=e.target.id
})
setSortedProducts(a)
}

const filterStyle = {
    transform:`translateX(${transform})`,
    transition:"all ease .9s"

  };

const handlehide=()=>{
    if (transform=="-90vw"){

        setTransform("-20vw")
    }
    else if(transform=="-20vw"){
        setTransform("-90vw")

    }
}

if (!productsCarousel) return <Loder/>;

return (
<div className="Cart-container">
<button  onClick={handlehide} className="max">Filters</button>
<div  className="Filter">
<h1>Filters</h1>
{/*<div className="FilterValue">
<span>{range}$</span>
<span>rating</span>
<span>{review}</span>
</div>*/}
<div className="lowhighfilter">
<select onChange={handleLowHighFilter}>
<option value="lowtohigh" key="lowtohigh">
Low to High
</option>
<option value="highttolow" key="highttolow">
High to Low
</option>
</select>
<div className="startsMaindiv">
<label>By Rating</label>
<div className="starts" onClick={(e)=>handlesubmit(e)} >
<iconify-icon id="1" icon={star} style={{color:"white"}}></iconify-icon>
<iconify-icon id="2" icon={star} style={{color:"white"}}></iconify-icon>
<iconify-icon id="3" icon={star} style={{color:"white"}}></iconify-icon>
<iconify-icon id="4" icon={star} style={{color:"white"}}></iconify-icon>
<iconify-icon id="5" icon={star} style={{color:"white"}}></iconify-icon>
</div>
</div>
</div>

<div className="Price">
<p>Price</p>
<input type="range" onChange={(e)=>handleRangeChange(e)} max={input} />
<div className="inputrange">
<span>0</span>
<span>{range}</span>
</div>
</div>
<div className="Review">
<h5>By customer Review</h5>
<select onChange={handleReviewChange}>
<option value="100" key="100">
Based on 100
</option>
<option value="200" key="200">
Based on 200
</option>
<option value="250" key="250">
Based on 250
</option>
<option value="300" key="300">
Based on 300
</option>
<option value="400" key="400">
Based on 400
</option>
</select>
</div>
</div>

<div style= {filterStyle} className="FilterMobile">
<h1>Filters</h1>
{/*<div className="FilterValue">
<span>{range}$</span>
<span>rating</span>
<span>{review}</span>
</div>*/}
<div className="lowhighfilter">
<select onChange={handleLowHighFilter}>
<option value="lowtohigh" key="lowtohigh">
Low to High
</option>
<option value="highttolow" key="highttolow">
High to Low
</option>
</select>
<div className="startsMaindiv">
<label>By Rating</label>
<div className="starts" onClick={(e)=>handlesubmit(e)} >
<iconify-icon id="1" icon={star} style={{color:"white"}}></iconify-icon>
<iconify-icon id="2" icon={star} style={{color:"white"}}></iconify-icon>
<iconify-icon id="3" icon={star} style={{color:"white"}}></iconify-icon>
<iconify-icon id="4" icon={star} style={{color:"white"}}></iconify-icon>
<iconify-icon id="5" icon={star} style={{color:"white"}}></iconify-icon>
</div>
</div>
</div>

<div className="Price">
<p>Price</p>
<input type="range" onChange={(e)=>handleRangeChange(e)} max={input} />
<div className="inputrange">
<span>0</span>
<span>{range}</span>
</div>
</div>
<div className="Review">
<h5>By customer Review</h5>
<select onChange={handleReviewChange}>
<option value="100" key="100">
Based on 100
</option>
<option value="200" key="200">
Based on 200
</option>
<option value="250" key="250">
Based on 250
</option>
<option value="300" key="300">
Based on 300
</option>
<option value="400" key="400">
Based on 400
</option>
</select>
</div>
</div>








{sortedProducts.map((elm) => (
<div className="Cart-item" key={elm.id}>
<img className="Product-image" src={elm.image} alt={elm.title} />
<div className="Product-details">
<h2 className="Product-title">{elm.title}</h2>
<p className="Product-price">${elm.price}</p>
<p className="Product-description">{elm.description}</p>
<p style={{ color: "black" }} className="Product-category">
Category: {elm.category}
</p>
<div className="Product-rating">
<span  style={{ color: "black" }}>{elm.rating.rate}</span>
<i style={{color:"#f39c12"}} className="fa-solid fa-star"></i>
<span style={{ color: "black" }}>
{" "}
({elm.rating.count} reviews)
</span>
</div>
<div className="Product-actions">
<button
onClick={() => handleAddToCart(elm)}
className="Add-to-cart"
>
Add to Cart
</button>
<button
onClick={() => handleAddToFav(elm)}
className="Add-to-fav"
>
Add to Favorites
</button>
</div>
</div>
</div>
))}
</div>
);
};

export default Carousel;




